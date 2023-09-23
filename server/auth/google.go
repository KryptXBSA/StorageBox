package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	// "io/ioutil"
	"net/http"

	"github.com/AlandSleman/StorageBox/config"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type GoogleProfile struct {
	Audience        string `json:"aud"`
	AuthorizedParty string `json:"azp"`
	Email           string `json:"email"`
	EmailVerified   bool   `json:"email_verified"`
	Expiration      int    `json:"exp"`
	FamilyName      string `json:"family_name"`
	GivenName       string `json:"given_name"`
	HostedDomain    string `json:"hd"`
	IssuedAt        int    `json:"iat"`
	Issuer          string `json:"iss"`
	JwtID           string `json:"jti"`
	Name            string `json:"name"`
	NotBefore       int    `json:"nbf"`
	Picture         string `json:"picture"`
	Subject         string `json:"sub"`
}

func Google(c *gin.Context) {
	// Get the authorization code from the query parameters
	code := c.DefaultQuery("code", "")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Authorization code is missing"})
		return
	}

	// Create a new OAuth2 configuration for Google
	googleOAuthConfig := oauth2.Config{
		ClientID:     config.GetConfig().GOOGLE_CLIENT_ID,
		ClientSecret: config.GetConfig().GOOGLE_CLIENT_SECRET,
		RedirectURL:  config.GetConfig().GOOGLE_REDIRECT_URI,
		Scopes:       []string{"profile", "email"}, // Specify the scopes you need
		Endpoint:     google.Endpoint,
	}

	// Exchange the authorization code for an access google_token
	google_token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println("OAuth exchange error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "An error occurred during OAuth exchange"})
		return
	}

	// Use the token to fetch the user's Google profile
	profile, err := getGoogleUserProfile(google_token)
	if err != nil {
		fmt.Println("Error fetching Google user profile:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch Google user profile"})
		return
	}

	user, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(profile.Subject),
	).Exec(prisma.Context())

	if err != nil {
		if errors.Is(err, db.ErrNotFound) {
			// User not found, create a new user
			// TODO trim name
			user, err = CreateUserProvider(profile.Subject, profile.Name, "discord", profile.Email)
			if err != nil {
				println("eee", err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
				return
			}
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error while finding user"})
			return
		}
	}

	if user.Provider == "password" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid login"})
		return
	}

	token, err := GenerateJWTToken(user.ID, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	// Return the token to the client
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func getGoogleUserProfile(token *oauth2.Token) (*GoogleProfile, error) {
	// Create an HTTP client
	client := &http.Client{}

	// Create a request to fetch the user's Google profile
	req, err := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v3/userinfo", nil)
	if err != nil {
		return nil, err
	}

	// Set the Authorization header with the access token
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token.AccessToken))

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("Failed to fetch Google profile")
	}

	// bodyBytes, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	return nil, err
	// }

	// // Print the full response body
	// fmt.Println("Response Body:", string(bodyBytes))

	// Parse the response JSON into a GoogleProfile struct
	var profile GoogleProfile
	err = json.NewDecoder(resp.Body).Decode(&profile)
	if err != nil {
		return nil, err
	}

	return &profile, nil
}

package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/AlandSleman/StorageBox/config"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"net/http"
)

type DiscordProfile struct {
	ID               string `json:"id"`
	Username         string `json:"username"`
	Discriminator    string `json:"discriminator"`
	Avatar           string `json:"avatar"`
	Bot              bool   `json:"bot,omitempty"`
	System           bool   `json:"system,omitempty"`
	MFAEnabled       bool   `json:"mfa_enabled"`
	Banner           string `json:"banner"`
	AccentColor      int    `json:"accent_color,omitempty"`
	Locale           string `json:"locale"`
	Verified         bool   `json:"verified"`
	Email            string `json:"email,omitempty"`
	Flags            int    `json:"flags"`
	PremiumType      int    `json:"premium_type"`
	PublicFlags      int    `json:"public_flags"`
	DisplayName      string `json:"display_name,omitempty"`
	AvatarDecoration string `json:"avatar_decoration,omitempty"`
	BannerColor      string `json:"banner_color,omitempty"`
	ImageURL         string `json:"image_url"`
}

func Discord(c *gin.Context) {
	// Retrieve the authorization code from the query parameters
	code := c.DefaultQuery("code", "")

	// Construct the OAuth2 configuration for Discord
	discordOAuthConfig := oauth2.Config{
		ClientID:     config.GetConfig().DISCORD_CLIENT_ID,
		ClientSecret: config.GetConfig().DISCORD_CLIENT_SECRET,
		RedirectURL:  config.GetConfig().DISCORD_REDIRECT_URI,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://discord.com/api/oauth2/authorize",
			TokenURL: "https://discord.com/api/oauth2/token",
		},
		Scopes: []string{"identify", "email"},
	}

	// Exchange the authorization code for an access discord_token
	discord_token, err := discordOAuthConfig.Exchange(c, code)
	if err != nil {
		fmt.Println("OAuth exchange error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "An error occurred during OAuth exchange"})
		return
	}

	// Fetch the user's Discord profile using the access token
	profile, err := getDiscordUserProfile(discord_token.AccessToken)
	if err != nil {
		fmt.Println("Error fetching Discord user profile:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch Discord user profile"})
		return
	}

	user, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(profile.ID),
	).Exec(prisma.Context())

	if err != nil {
		if errors.Is(err, db.ErrNotFound) {
			// User not found, create a new user
			// TODO trim name
			user, err = CreateUserProvider(profile.ID, profile.Username, "discord", profile.Email)
			if err != nil {
        println("eee",err.Error())
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

func getDiscordUserProfile(accessToken string) (*DiscordProfile, error) {
	// Define the Discord API URL to fetch the user's profile
	discordProfileURL := "https://discord.com/api/users/@me"

	// Create an HTTP client
	client := &http.Client{}

	// Create a request with the necessary headers
	req, err := http.NewRequest("GET", discordProfileURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)

	// Send the request to Discord API
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Discord API request failed with status code: %d", resp.StatusCode)
	}

	// Parse the response body into a DiscordProfile struct
	var profile DiscordProfile
	if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		return nil, err
	}

	return &profile, nil
}

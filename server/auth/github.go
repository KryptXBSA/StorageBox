package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/AlandSleman/StorageBox/config"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

type GitHubProfile struct {
	Login             string `json:"login"`
	ID                int    `json:"id"`
	NodeID            string `json:"node_id"`
	AvatarURL         string `json:"avatar_url"`
	GravatarID        string `json:"gravatar_id"`
	URL               string `json:"url"`
	HTMLURL           string `json:"html_url"`
	FollowersURL      string `json:"followers_url"`
	FollowingURL      string `json:"following_url"`
	GistsURL          string `json:"gists_url"`
	StarredURL        string `json:"starred_url"`
	SubscriptionsURL  string `json:"subscriptions_url"`
	OrganizationsURL  string `json:"organizations_url"`
	ReposURL          string `json:"repos_url"`
	EventsURL         string `json:"events_url"`
	ReceivedEventsURL string `json:"received_events_url"`
	Type              string `json:"type"`
	SiteAdmin         bool   `json:"site_admin"`
	Name              string `json:"name"`
	Company           string `json:"company"`
	Blog              string `json:"blog"`
	Location          string `json:"location"`
	Email             string `json:"email"`
	Hireable          bool   `json:"hireable"`
	Bio               string `json:"bio"`
	TwitterUsername   string `json:"twitter_username,omitempty"`
	PublicRepos       int    `json:"public_repos"`
	PublicGists       int    `json:"public_gists"`
	Followers         int    `json:"followers"`
	Following         int    `json:"following"`
	CreatedAt         string `json:"created_at"`
	UpdatedAt         string `json:"updated_at"`
	PrivateGists      int    `json:"private_gists,omitempty"`
	TotalPrivateRepos int    `json:"total_private_repos,omitempty"`
	OwnedPrivateRepos int    `json:"owned_private_repos,omitempty"`
	DiskUsage         int    `json:"disk_usage,omitempty"`
	SuspendedAt       string `json:"suspended_at,omitempty"`
	Collaborators     int    `json:"collaborators,omitempty"`
	TwoFactorAuth     bool   `json:"two_factor_authentication"`
	Plan              struct {
		Collaborators int    `json:"collaborators"`
		Name          string `json:"name"`
		Space         int    `json:"space"`
		PrivateRepos  int    `json:"private_repos"`
	} `json:"plan,omitempty"`
}

func Github(c *gin.Context) {
	// Retrieve the authorization code from the query parameters
	code := c.DefaultQuery("code", "")
	println("asdsdsad", code)

	// Construct the OAuth2 configuration for GitHub
	githubOAuthConfig := oauth2.Config{
		ClientID:     config.GetConfig().GITHUB_CLIENT_ID,
		ClientSecret: config.GetConfig().GITHUB_CLIENT_SECRET,
		RedirectURL:  config.GetConfig().GITHUB_REDIRECT_URI,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://github.com/login/oauth/authorize",
			TokenURL: "https://github.com/login/oauth/access_token",
		},
	}

	// Exchange the authorization code for an access gh_token
	gh_token, err := githubOAuthConfig.Exchange(c, code)
	if err != nil {
		println("eeeeeeeeeeeeeee", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "An error occurred"})
		return
	}
	println("tknnnnnnn", gh_token.AccessToken)

	// Fetch the user's GitHub profile using the access token
	profile, err := getUserProfile(gh_token.AccessToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Check if the profile has an email address
	if profile.Email == "" {
		// If the user does not have a public email, get another via the GitHub API
		anotherEmail, err := getUserAnotherEmail(gh_token.AccessToken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		profile.Email = anotherEmail
	}

	user, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(strconv.Itoa(profile.ID)),
	).Exec(prisma.Context())

	if err != nil {
		if errors.Is(err, db.ErrNotFound) {
			// User not found, create a new user
			// TODO trim name
			user, err = CreateUserProvider(strconv.Itoa(profile.ID), profile.Name, "github", profile.Email)
			if err != nil {
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

	// Handle the user profile data as needed

	token, err := GenerateJWTToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	// Return the token to the client
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func getUserProfile(accessToken string) (*GitHubProfile, error) {
	// Define the GitHub API URL to fetch user profile
	githubProfileURL := "https://api.github.com/user"

	// Create an HTTP client
	client := &http.Client{}

	// Create a request with the necessary headers
	req, err := http.NewRequest("GET", githubProfileURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("User-Agent", "authgo")

	// Send the request to GitHub API
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API request failed with status code: %d", resp.StatusCode)
	}

	// Parse the response body into a GitHubProfile struct
	var profile GitHubProfile
	if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		return nil, err
	}

	return &profile, nil
}

func getUserAnotherEmail(accessToken string) (string, error) {
	// Define the GitHub API URL to fetch another email
	githubEmailURL := "https://api.github.com/user/emails"

	// Create an HTTP client
	client := &http.Client{}

	// Create a request with the necessary headers
	req, err := http.NewRequest("GET", githubEmailURL, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("User-Agent", "authgo")

	// Send the request to GitHub API
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("GitHub API request failed with status code: %d", resp.StatusCode)
	}

	// Parse the response body to extract the email address
	var emails []struct {
		Email      string `json:"email"`
		Primary    bool   `json:"primary"`
		Verified   bool   `json:"verified"`
		Visibility string `json:"visibility"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&emails); err != nil {
		return "", err
	}

	// Find and return the primary email, or the first email if none is marked as primary
	for _, email := range emails {
		if email.Primary {
			return email.Email, nil
		}
	}

	if len(emails) > 0 {
		return emails[0].Email, nil
	}

	return "", fmt.Errorf("No public email found")
}

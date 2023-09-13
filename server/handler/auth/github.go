package auth

import (
	"net/http"

	"github.com/AlandSleman/StorageBox/config"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

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

	// Exchange the authorization code for an access token
	token, err := githubOAuthConfig.Exchange(c, code)
	if err != nil {
		println("eeeeeeeeeeeeeee", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "An error occured"})
		return
	}
	println("tknnnnnnn", token.AccessToken)

	// Use the access token to make requests to the GitHub API or perform other actions

	// You can also store the token securely for future use, such as making authenticated API requests on behalf of the user

	c.JSON(http.StatusOK, gin.H{"access_token": token.AccessToken})
}

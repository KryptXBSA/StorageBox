package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// Replace with your own secret key
const secretKey = "your-secret-key"

func main() {
	router := gin.Default()

	router.Use(middleware.Cors())

	// Custom middleware to extract and validate JWT from Authorization header
	router.Use(middleware.Auth)

	// Login route
	router.POST("/login", func(c *gin.Context) {
		var loginRequest struct {
			Username string `json:"username" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if err := c.ShouldBindJSON(&loginRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
			return
		}

		// Here, you would typically validate the username and password against your user database.
		// For simplicity, we'll assume a hardcoded valid username and password.
		validUsername := "uuu"
		validPassword := "ppp"

		if loginRequest.Username != validUsername || loginRequest.Password != validPassword {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
			return
		}

		// Generate a JWT token upon successful authentication
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["username"] = loginRequest.Username
		claims["exp"] = time.Now().Add(time.Second * 30).Unix() // Token expiration time (1 hour)

		// Sign the token with the secret key
		tokenString, err := token.SignedString([]byte(secretKey))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
			return
		}

		// Return the token to the client
		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	})

	fmt.Println("Listening at :4000")
	if err := router.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

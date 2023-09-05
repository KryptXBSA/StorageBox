package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"strings"
)

const secretKey = "your-secret-key"

func Auth(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing Authorization header"})
		c.Abort()
		return
	}

	// Check if the Authorization header has the "Bearer" prefix
	if !strings.HasPrefix(authHeader, "Bearer ") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid Authorization header format"})
		c.Abort()
		return
	}

	// Extract the token part after "Bearer "
	tokenString := authHeader[7:]

	// Parse the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Invalid signing method")
		}
		// Provide the secret key to validate the token
		return []byte(secretKey), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token"})
		println(err.Error())
		c.Abort()
		return
	}

	// Check if the token is valid
	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Token is not valid"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if id, exists := claims["id"].(string); exists {
			c.Set("id", id)
		}
	}

	// Continue with the request
	c.Next()
}

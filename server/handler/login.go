package handler

import (
	"errors"
	"net/http"

	"github.com/AlandSleman/StorageBox/auth"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
)

type LoginRequestBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	// Parse the request body
	var body LoginRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	// Attempt to find the user by username
	user, err := prisma.Client().User.FindFirst(
		db.User.Username.Equals(body.Username),
	).Exec(prisma.Context())

	if err != nil {
		if errors.Is(err, db.ErrNotFound) {
			// User not found, create a new user
			user, err = auth.CreateUserPassword(body.Username, body.Password)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
				return
			}
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error while finding user"})
			return
		}
	}
	if user.Provider != "password" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid login"})
		return
	}

	// Check if the provided password matches the stored hash
	pass, _ := user.Password()
	if err := auth.CheckPassword(pass, body.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid password"})
		return
	}

	// Generate a JWT token upon successful authentication
	token, err := auth.GenerateJWTToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	// Return the token to the client
	c.JSON(http.StatusOK, gin.H{"token": token})
}

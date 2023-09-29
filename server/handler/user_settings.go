package handler

import (
	"github.com/AlandSleman/StorageBox/auth"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type PasswordChangeRequest struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

func UserSettings(c *gin.Context) {
	var body PasswordChangeRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	userID := c.GetString("id")

	user, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(userID),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	if user.Provider != "password" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}


	// Verify if the current password matches the user's current hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.CurrentPassword)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid password"})
		return
	}

	// Hash the new password
	hashedPassword, err := auth.HashPassword(body.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
		return
	}

	// Save the updated user back to the database (implement this function)
	user, err = prisma.Client().User.FindUnique(
		db.User.ID.Equals(userID),
	).Update(db.User.Password.Set(hashedPassword)).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}

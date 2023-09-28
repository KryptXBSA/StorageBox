package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AdminUsers(c *gin.Context) {
	// Fetch the authenticated user
	userID := c.GetString("id")
	authUser, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(userID),
	).Exec(prisma.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch authenticated user"})
		return
	}

	// Fetch all users with their files and folders
	users, err := prisma.Client().User.FindMany().With(db.User.Files.Fetch()).With(db.User.Folders.Fetch()).Exec(prisma.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	// Check the user's role and modify sensitive data if necessary
	if authUser.Role != "admin" {
		for i, user := range users {
			// Obfuscate the email address
			// if email, ok := user.Email(); ok {
			// 	email.Value = "******@gmail.com"
			// }

			// Obfuscate the names of user's folders
			for j := range user.Folders() {
				users[i].Folders()[j].Name = "***"
			}

			// Obfuscate the names of user's files
			for j := range user.Files() {
				users[i].Files()[j].Name = "***"
			}
		}
	}

	// Return the list of users (with email addresses obfuscated and sensitive data modified if necessary)
	c.JSON(http.StatusOK, users)
}

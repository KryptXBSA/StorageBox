package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AdminOverview(c *gin.Context) {
	userID := c.GetString("id")

	_, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(userID),
	).Exec(prisma.Context())

	// Fetch the total storage size and file count
	var totalStorage int64
	var fileCount int

	// Fetch all users
	users, err := prisma.Client().User.FindMany().With(db.User.Files.Fetch()).Exec(prisma.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	// Calculate total storage size and file count
	for _, user := range users {
		for _, file := range user.Files() {
			totalStorage += int64(file.Size)
			fileCount++
		}
	}

	// Return the statistics
	c.JSON(http.StatusOK, gin.H{
		"userCount":    len(users),   // Use the length of the users slice as the user count
		"totalStorage": totalStorage, // Total storage size in bytes
		"fileCount":    fileCount,
	})
}

package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UserData(c *gin.Context) {

	userID := c.GetString("id")

	folders, err := prisma.Client().Folder.FindMany(
		db.Folder.UserID.Equals(userID),
	).Exec(prisma.Context())
	files, err := prisma.Client().File.FindMany(
		db.File.UserID.Equals(userID),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get user data"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"folders":folders,"files":files})
}

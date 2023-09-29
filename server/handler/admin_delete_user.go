package handler

import (
	"errors"
	"net/http"
	"os"
	"path/filepath"

	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
)

func AdminDeleteUser(c *gin.Context) {

	var Body struct {
		UserID string `json:"id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	user, err := prisma.Client().User.FindUnique(
		db.User.ID.Equals(Body.UserID),
	).With(db.User.Files.Fetch()).With(db.User.Folders.Fetch()).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get user"})
		return
	}

	for _, file := range user.Files() {
		mainFilePath := filepath.Join("./uploads/", user.ID, file.ID)
		infoFilePath := mainFilePath + ".info"

		err := os.Remove(mainFilePath)
		if err != nil {
			println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete file"})
			return
		}

		// Delete the info file
		err = os.Remove(infoFilePath)
		if err != nil {
			println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete info file"})
			return
		}

		user, err = prisma.Client().User.FindUnique(
			db.User.ID.Equals(Body.UserID),
		).Delete().Exec(prisma.Context())

		if err != nil {
			if errors.Is(err, db.ErrNotFound) {
				// success deleted user
			} else {
				println(err.Error())
				c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete user"})
				return
			}
		}

	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
	return
}

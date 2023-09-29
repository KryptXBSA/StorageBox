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

func AdminDeleteFile(c *gin.Context) {

	var Body struct {
		FileID string `json:"id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	file, err := prisma.Client().File.FindUnique(
		db.File.ID.Equals(Body.FileID),
	).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get file"})
		return
	}

	mainFilePath := filepath.Join("./uploads/", file.UserID, file.ID)
	infoFilePath := mainFilePath + ".info"

	err = os.Remove(mainFilePath)
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete file"})
		return
	}

	err = os.Remove(infoFilePath)
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete info file"})
		return
	}

	_, err = prisma.Client().File.FindUnique(
		db.File.ID.Equals(file.ID),
	).Delete().Exec(prisma.Context())

	if err != nil {
		if errors.Is(err, db.ErrNotFound) {
			// success deleted file
		} else {
			println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete user"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
	return
}

package handler

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
)

func DeleteFolder(c *gin.Context) {

	var Body struct {
		FolderID string `json:"id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	userID := c.GetString("id")

	folder, err := prisma.Client().Folder.FindFirst(
		db.Folder.And(db.Folder.UserID.Equals(userID), db.Folder.ID.Equals(Body.FolderID)),
	).With(db.Folder.Files.Fetch()).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get folder"})
		return
	}

  // delete all files associated with this folder
	for _, file := range folder.Files() {
		mainFilePath := filepath.Join("./uploads/", userID, file.ID)
		infoFilePath := mainFilePath + ".info"

		err := os.Remove(mainFilePath)

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
	}

	_, err = prisma.Client().Folder.FindMany(
		db.Folder.And(db.Folder.UserID.Equals(userID), db.Folder.ID.Equals(Body.FolderID)),
	).Delete().Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete folder"})
		return
	}

  // get latest folders and files
	folders, err := prisma.Client().Folder.FindMany(
		db.Folder.UserID.Equals(userID),
	).Exec(prisma.Context())

	files, err := prisma.Client().File.FindMany(
		db.File.UserID.Equals(userID),
	).Exec(prisma.Context())

	c.JSON(http.StatusOK, gin.H{"folders": folders, "files": files})
	return
}

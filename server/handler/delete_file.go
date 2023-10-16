package handler

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
)

func DeleteFile(c *gin.Context) {

	var Body struct {
		FileId string `json:"id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	userID := c.GetString("id")

	file, err := prisma.Client().File.FindFirst(
		db.File.And(db.File.UserID.Equals(userID), db.File.ID.Equals(Body.FileId)),
	).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to find file"})
		return
	}

	// decrement the total Storage for user
	_, err = prisma.Client().User.FindUnique(
		db.User.ID.Equals(userID),
	).Update(db.User.Storage.Decrement(file.Size)).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to decrement Storage for user"})
		return
	}
	_, err = prisma.Client().File.FindMany(
		db.File.And(db.File.UserID.Equals(userID), db.File.ID.Equals(Body.FileId)),
	).Delete().Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to delete file"})
		return
	}

	mainFilePath := filepath.Join("./uploads/", userID, Body.FileId)
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

	folders, err := prisma.Client().Folder.FindMany(
		db.Folder.UserID.Equals(userID),
	).Exec(prisma.Context())
	files, err := prisma.Client().File.FindMany(
		db.File.UserID.Equals(userID),
	).Exec(prisma.Context())

	c.JSON(http.StatusOK, gin.H{"folders": folders, "files": files})
	return
}

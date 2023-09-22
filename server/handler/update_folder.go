package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UpdateFolder(c *gin.Context) {

	var Body struct {
		Name   string `json:"name" binding:"required"`
		FileId string `json:"id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	userID := c.GetString("id")

	_, err := prisma.Client().Folder.FindMany(
		db.Folder.And(db.Folder.UserID.Equals(userID), db.Folder.ID.Equals(Body.FileId)),
	).Update(db.Folder.Name.Set(Body.Name)).Exec(prisma.Context())

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to update file"})
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

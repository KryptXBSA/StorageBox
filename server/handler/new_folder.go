package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

var NewFolderBody struct {
	Name     string `json:"name" binding:"required"`
	ParentID string `json:"parentId" binding:"required"`
}

func NewFolder(c *gin.Context) {

	if err := c.ShouldBindJSON(&NewFolderBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	userID := c.GetString("id")

	user, err := prisma.Client().User.FindFirst(
		db.User.ID.Equals(userID),
	).With(db.User.Folders.Fetch()).Exec(prisma.Context())
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get user"})
		return
	}

	userOwnsFolder := false
	for _, folder := range user.Folders() {
		if folder.ID == NewFolderBody.ParentID {
			userOwnsFolder = true
			break
		}
	}

	if userOwnsFolder == false {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User doesn't own folder"})
		return
	}

	folderName := NewFolderBody.Name

	_, err = prisma.Client().Folder.CreateOne(
		db.Folder.Name.Set(folderName),
		db.Folder.User.Link(db.User.ID.Equals(userID)),
		db.Folder.Parent.Link(db.Folder.ID.Equals(NewFolderBody.ParentID)),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to create folder"})
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

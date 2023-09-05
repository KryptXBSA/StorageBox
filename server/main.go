package main

import (
	"fmt"
	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/AlandSleman/StorageBox/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Replace with your own secret key

func main() {
	prisma.Init()
	router := gin.Default()
	router.Use(middleware.Cors())

	router.POST("/login", handler.Login)

	router.Use(middleware.Auth)

	router.GET("/session", func(c *gin.Context) {

		userID := c.GetString("id")

		user, err := prisma.Client().User.FindFirst(
			db.User.ID.Equals(userID),
		).With(db.User.Folders.Fetch()).Exec(prisma.Context())

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": user})
	})

	var body struct {
		Name     string `json:"name" binding:"required"`
		ParentID string `json:"parentId" binding:"required"`
	}
	router.POST("/folder", func(c *gin.Context) {

		if err := c.ShouldBindJSON(&body); err != nil {
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

		path := utils.RandomPath()
		userOwnsFolder := false
		for _, folder := range user.Folders() {
			if folder.ID == body.ParentID {
				path = folder.Path + path + "/"
				userOwnsFolder = true
				break
			}
		}

		if userOwnsFolder == false {
			c.JSON(http.StatusBadRequest, gin.H{"message": "User doesn't own folder"})
			return
		}

		folderName := body.Name

		newFolder, err := prisma.Client().Folder.CreateOne(
			db.Folder.Name.Set(folderName),
			db.Folder.Path.Set(path),
			db.Folder.User.Link(db.User.ID.Equals(userID)),
			db.Folder.Parent.Link(db.Folder.ID.Equals(body.ParentID)),
		).Exec(prisma.Context())

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to create folder"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "created folder", "folder": newFolder, "all": user})
		return
	})

	fmt.Println("Listening at :4000")
	if err := router.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

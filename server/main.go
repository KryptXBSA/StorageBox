package main

import (
	"fmt"
	"net/http"
	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(middleware.Cors())
	prisma.Init()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})
	router.POST("/login", handler.Login)

	router.Use(middleware.Auth)

	router.GET("/session", handler.Session)
	router.POST("/folder", handler.NewFolder)

	router.PATCH("/file", handler.UpdateFile)
	router.PATCH("/folder", handler.UpdateFolder)
	router.POST("/folder/delete", handler.DeleteFolder)
	router.POST("/file/delete", handler.DeleteFile)

	router.GET("/data", handler.UserData)

	// router.Use(middleware.DirExists)
	router.POST("/files/", handler.PostHandler)
	router.HEAD("/files/:id", handler.HeadHandler)
	router.PATCH("/files/:id", handler.PatchHandler)
	router.GET("/files/:id", handler.GetHandler)

	fmt.Println("Listening at :4000")
	if err := router.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

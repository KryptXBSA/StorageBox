package main

import (
	"fmt"
	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/handler/auth"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.Use(middleware.Cors())

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})

	prisma.Init()

	r.POST("/login", handler.Login)
	r.GET("/auth/github/callback", auth.Github)

	r.Use(middleware.Auth)

	r.GET("/session", handler.Session)
	r.POST("/folder", handler.NewFolder)

	r.PATCH("/file", handler.UpdateFile)
	r.PATCH("/folder", handler.UpdateFolder)
	r.POST("/folder/delete", handler.DeleteFolder)
	r.POST("/file/delete", handler.DeleteFile)

	r.GET("/data", handler.UserData)

	// router.Use(middleware.DirExists)
	r.POST("/files/", handler.PostHandler)
	r.HEAD("/files/:id", handler.HeadHandler)
	r.PATCH("/files/:id", handler.PatchHandler)
	r.GET("/files/:id", handler.GetHandler)

	fmt.Println("Listening at :4000")
	if err := r.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

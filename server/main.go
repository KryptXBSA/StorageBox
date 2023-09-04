package main

import (
	"fmt"
	"net/http"

	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/gin-gonic/gin"
)

// Replace with your own secret key

func main() {
	router := gin.Default()
	router.Use(middleware.Cors())
	router.POST("/login", handler.Login)
	router.Use(middleware.Auth)
	router.GET("/user", func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{"token": "a"})

	})

	fmt.Println("Listening at :4000")
	if err := router.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

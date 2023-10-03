package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/AlandSleman/StorageBox/auth"
	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadEnvVariables() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		os.Exit(1)
	}
}

// create admin user
func seedDb() {
	pass, _ := auth.HashPassword("admin")
	_, _ = prisma.Client().User.CreateOne(db.User.Username.Set("admin"),
		db.User.Provider.Set("password"),
		db.User.Role.Set("admin"),
		db.User.Password.Set(pass)).Exec(prisma.Context())
}

func main() {
	loadEnvVariables()
	r := gin.Default()
	r.Use(middleware.Cors())

	r.Use(middleware.RateLimit())

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})

	prisma.Init()
	seedDb()

	r.POST("/login", handler.Login)

	r.GET("/auth/github/callback", auth.Github)
	r.GET("/auth/discord/callback", auth.Discord)
	r.GET("/auth/google/callback", auth.Google)

	r.Use(middleware.Auth)

	r.PUT("/user", handler.UserSettings)

	r.GET("/session", handler.Session)
	r.POST("/folder", handler.NewFolder)

	r.PATCH("/file", handler.UpdateFile)
	r.PATCH("/folder", handler.UpdateFolder)
	r.DELETE("/folder", handler.DeleteFolder)
	r.DELETE("/file", handler.DeleteFile)

	r.GET("/data", handler.UserData)

	r.HEAD("/files/:id", handler.HeadHandler)
	r.GET("/files/:id", handler.GetHandler)
	r.POST("/files/", middleware.DirExists, handler.PostHandler)
	r.PATCH("/files/:id", middleware.DirExists, handler.PatchHandler)

	//admin routes
	r.GET("/admin/overview", handler.AdminOverview)
	r.GET("/admin/users", handler.AdminUsers)
	r.GET("/admin/files", handler.AdminFiles)
	r.Use(middleware.AuthAdmin)
	r.DELETE("/admin/user", handler.AdminDeleteUser)
	r.DELETE("/admin/user-files", handler.AdminDeleteAllUserFiles)
	r.DELETE("/admin/file", handler.AdminDeleteFile)

	fmt.Println("Listening at :4000")
	if err := r.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}

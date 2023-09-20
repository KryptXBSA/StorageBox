package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/AlandSleman/StorageBox/auth"
	"github.com/AlandSleman/StorageBox/handler"
	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	limiter "github.com/ulule/limiter/v3"
	mgin "github.com/ulule/limiter/v3/drivers/middleware/gin"
	sredis "github.com/ulule/limiter/v3/drivers/store/redis"
)

func main() {
	r := gin.Default()
	r.Use(middleware.Cors())

	rate, err := limiter.NewRateFromFormatted("70-M")
	if err != nil {
		log.Fatal(err)
		return
	}

	// Create a redis client.
	option, err := redis.ParseURL("redis://localhost:6379/0")
	if err != nil {
		log.Fatal(err)
		return
	}
	client := redis.NewClient(option)

	// Create a store with the redis client.
	store, err := sredis.NewStoreWithOptions(client, limiter.StoreOptions{
		Prefix:   "limiter",
		MaxRetry: 3,
	})
	if err != nil {
		log.Fatal(err)
		return
	}

	// Create a new middleware with the limiter instance.
	limiterMiddleware := mgin.NewMiddleware(limiter.New(store, rate))

	r.Use(limiterMiddleware)
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})

	prisma.Init()

	r.POST("/login", handler.Login)

	r.GET("/auth/github/callback", auth.Github)
	r.GET("/auth/discord/callback", auth.Discord)

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

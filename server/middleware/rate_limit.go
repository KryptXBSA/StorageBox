package middleware

import (
	"log"
	"os"

	"github.com/AlandSleman/StorageBox/config"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	limiter "github.com/ulule/limiter/v3"
	mgin "github.com/ulule/limiter/v3/drivers/middleware/gin"
	sredis "github.com/ulule/limiter/v3/drivers/store/redis"
)

func RateLimit() gin.HandlerFunc {
	rate, err := limiter.NewRateFromFormatted("85-M")
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	// Create a redis client.
	option, err := redis.ParseURL(config.GetConfig().REDIS_URL)
	if err != nil {
		log.Fatal("errris:", err)
		os.Exit(1)
	}
	client := redis.NewClient(option)

	// Create a store with the redis client.
	store, err := sredis.NewStoreWithOptions(client, limiter.StoreOptions{
		Prefix:   "limiter",
		MaxRetry: 3,
	})
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	// Create a new middleware with the limiter instance.
	return mgin.NewMiddleware(limiter.New(store, rate))
}

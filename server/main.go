package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/AlandSleman/StorageBox/middleware"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// Replace with your own secret key
const secretKey = "your-secret-key"

func main() {
	router := gin.Default()

	router.Use(middleware.Cors())

	// Custom middleware to extract and validate JWT from Authorization header

	// Login route
	var body struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	prisma := db.NewClient()
	if err := prisma.Prisma.Connect(); err != nil {
		println("connnnnnnnn")
		panic(err)
	}
	ctx := context.Background()
	router.POST("/login", func(c *gin.Context) {
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
			return
		}
		// get user from db
		user, err := prisma.User.FindFirst(
			db.User.Username.Equals(body.Username),
		).Exec(ctx)
		var id string

		if err != nil {
			// if user not found
			if errors.Is(err, db.ErrNotFound) {
				// create user assign id
				hashedPassword, err := hashPassword(body.Password)
				user, err = prisma.User.CreateOne(
					db.User.Username.Set(body.Username),
					db.User.Password.Set(hashedPassword),
				).Exec(ctx)
				id = user.ID

				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"message": "Error while creating user"})
					return
				}
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Error while finding user"})
				return
			}
		} else {
			pass, _ := user.Password()
			err = bcrypt.CompareHashAndPassword([]byte(pass), []byte(body.Password))
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid password"})
				return
			}
			id = user.ID
		}
		// make the comparision in here if success return token, else sreturn invalid pass
		// body.Password
		// user.Password===

		// Generate a JWT token upon successful authentication
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["id"] = id
		claims["exp"] = time.Now().Add(time.Minute * 30).Unix() // Token expiration time (1 hour)

		// Sign the token with the secret key
		tokenString, err := token.SignedString([]byte(secretKey))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
			return
		}

		// Return the token to the client
		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	})
	router.Use(middleware.Auth)
	router.GET("/user", func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{"token": "a"})

	})

	fmt.Println("Listening at :4000")
	if err := router.Run(":4000"); err != nil {
		panic(fmt.Errorf("Unable to start Gin server: %s", err))
	}
}
func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

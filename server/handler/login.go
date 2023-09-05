package handler

import (
	"errors"
	"net/http"
	"time"

	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

const secretKey = "your-secret-key"

var body struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	// get user from db
	user, err := prisma.Client().User.FindFirst(
		db.User.Username.Equals(body.Username),
	).Exec(prisma.Context())
	var id string

	if err != nil {
		// if user not found
		if errors.Is(err, db.ErrNotFound) {
			// create user assign id
			hashedPassword, err := hashPassword(body.Password)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Server err"})
				return
			}
			// TODO make this a TX
			user, err = prisma.Client().User.CreateOne(
				db.User.Username.Set(body.Username),
				db.User.Password.Set(hashedPassword),
			).Exec(prisma.Context())
			id = user.ID

			_, err = prisma.Client().Folder.CreateOne(
				db.Folder.Name.Set("/"),
				db.Folder.Path.Set("/"),
				db.Folder.User.Link(db.User.ID.Equals(id)),
			).Exec(prisma.Context())

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
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

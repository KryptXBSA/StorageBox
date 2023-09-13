package auth

import (
	"os"
	"time"

	"github.com/AlandSleman/StorageBox/config"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func CreateUserPassword(username, password string) (*db.UserModel, error) {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		return nil, err
	}

	user, err := prisma.Client().User.CreateOne(
		db.User.Username.Set(username),
		db.User.Provider.Set("password"),
		db.User.Password.Set(hashedPassword),
	).Exec(prisma.Context())

	if err != nil {
		return nil, err
	}

	// Create a folder for the user
	err = CreateFolderForUser(user.ID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func CreateUserProvider(id, username, provider string, email string) (*db.UserModel, error) {

	user, err := prisma.Client().User.CreateOne(
		db.User.Username.Set(username),
		db.User.Provider.Set(provider),
		db.User.ID.Set(id),
		db.User.Email.Set(email),
	).Exec(prisma.Context())

	if err != nil {
		return nil, err
	}

	// Create a folder for the user
	err = CreateFolderForUser(user.ID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func CheckPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func CreateFolderForUser(userID string) error {
	folderPath := "./uploads/" + userID // Specify the folder path

	_, err := prisma.Client().Folder.CreateOne(
		db.Folder.Name.Set("/"),
		db.Folder.User.Link(db.User.ID.Equals(userID)),
	).Exec(prisma.Context());
	if err != nil {
			return err
		}
	// Create the folder (including parent directories) with read-write permissions (os.ModePerm)
	if err := os.MkdirAll(folderPath, os.ModePerm); err != nil {
		return err
	}

	return nil
}

func GenerateJWTToken(userID string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 3000).Unix() // Token expiration time (1 hour)

	// Sign the token with the secret key
	return token.SignedString([]byte(config.GetConfig().JWT_SECRET))
}

// TODO add role
// func GenerateJWTToken(userID, role string) (string, error) {
//     token := jwt.New(jwt.SigningMethodHS256)
//     claims := token.Claims.(jwt.MapClaims)
//     claims["id"] = userID
//     claims["exp"] = time.Now().Add(time.Hour * 3000).Unix() // Token expiration time (1 hour)

//     // Include the role in the JWT claims if provided
//     if role != "" {
//         claims["role"] = role
//     }

//     // Sign the token with the secret key
//     return token.SignedString([]byte(config.GetConfig().JWT_SECRET))
// }

package handler

import (
	"errors"
	"fmt"
	"net/http"

	// "github.com/AlandSleman/StorageBox/prisma"
	// "github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/AlandSleman/StorageBox/config"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"github.com/steebchen/prisma-client-go/runtime/types"
	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
	// Import other necessary packages here
)

func PostHandler(c *gin.Context) {
	folderID := c.GetHeader("dir")
	if folderID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing dir header"})
		return
	}

	folder, err := prisma.Client().Folder.FindFirst(
		db.Folder.ID.Equals(folderID),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Folder not found"})
		return
	}
	if folder.UserID != c.GetString("id") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}
	dTusHandler(c).PostFile(c.Writer, c.Request)
}

func PatchHandler(c *gin.Context) {
	folderID := c.GetHeader("dir")

	if folderID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Missing dir header"})
		return
	}

	folder, err := prisma.Client().Folder.FindFirst(
		db.Folder.ID.Equals(folderID),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Folder not found"})
		return
	}
	if folder.UserID != c.GetString("id") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}
	dTusHandler(c).PatchFile(c.Writer, c.Request)
}
func HeadHandler(c *gin.Context) {
	fileId := c.Param("id")

	if fileId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing file id"})
		return
	}

	file, err := prisma.Client().File.FindFirst(
		db.File.ID.Equals(fileId),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "File not found"})
		return
	}
	// if user is not admin && not file owner return err
	if c.GetString("role") != "admin" {
		if file.UserID != c.GetString("id") {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
	}
	c.Set("id", file.UserID)

	dTusHandler(c).HeadFile(c.Writer, c.Request)
}

func GetHandler(c *gin.Context) {
	fileId := c.Param("id")
	if fileId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing file id"})
		return
	}


	file, err := prisma.Client().File.FindFirst(
		db.File.ID.Equals(fileId),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "File not found"})
		return
	}
	// if user is not admin && not file owner return err
	if c.GetString("role") != "admin" {
		if file.UserID != c.GetString("id") {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorizedd"})
			return
		}
	}
	c.Set("id", file.UserID)

	dTusHandler(c).GetFile(c.Writer, c.Request)
}

func dTusHandler(c *gin.Context) *tusd.UnroutedHandler {

	store := filestore.FileStore{
		// using userID as the prefix
		Path: "./uploads/" + c.GetString("id") + "/",
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	h, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath: "/files/",
		// BasePath:              "https://apii.kurdmake.com/files/",
		StoreComposer: composer,

		RespectForwardedHeaders: true,
		NotifyCompleteUploads:   true,
		PreUploadCreateCallback: func(hook tusd.HookEvent) error {

			user, err := prisma.Client().User.FindFirst(
				db.User.ID.Equals(c.GetString("id")),
			).Exec(prisma.Context())

			if err != nil {
				return errors.New("Failed to get user")
			}

			// if upload size + user.Storage > max size return err
			if db.BigInt(hook.Upload.Size)+db.BigInt(user.Storage) >= types.BigInt(config.GetConfig().MAX_SIZE) {
				return errors.New("Storage limit reached")
			}
			return nil
		},
	})

	if err != nil {
		println("Unable to create tus handler")
	}
	go func() {
		for {

			event := <-h.CompleteUploads

			//TODO make this a TX
			_, err = prisma.Client().File.CreateOne(
				db.File.ID.Set(event.Upload.ID),
				db.File.Name.Set(event.Upload.MetaData["name"]),
				db.File.Type.Set(event.Upload.MetaData["type"]),
				db.File.Size.Set(db.BigInt(event.Upload.Size)),
				db.File.User.Link(db.User.ID.Equals(c.GetString("id"))),
				db.File.Folder.Link(db.Folder.ID.Equals(c.GetHeader("dir"))),
			).Exec(prisma.Context())

			if err != nil {
				fmt.Println("Unable to create a new file", event.Upload.ID)
				return
			}
			_, err := prisma.Client().User.FindUnique(
				db.User.ID.Equals(c.GetString("id")),
			).Update(db.User.Storage.Increment(db.BigInt(event.Upload.Size))).Exec(prisma.Context())

			if err != nil {
				fmt.Println("Unable to update user", event.Upload.ID)
				return
			}

			println("Upload %s finished\n", event.Upload.ID, event.Upload.Size)
		}
	}()
	return h
}

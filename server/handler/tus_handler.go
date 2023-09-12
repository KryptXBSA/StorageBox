package handler

import (
	"fmt"
	"net/http"

	// "github.com/AlandSleman/StorageBox/prisma"
	// "github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
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

	// println(folder.UserID, c.GetString("id"))
	if folder.UserID != c.GetString("id") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "folderID!=id"})
		return
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Folder not found"})
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

	if folder.UserID != c.GetString("id") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Folder not found"})
		return
	}
	dTusHandler(c).PatchFile(c.Writer, c.Request)
}
func HeadHandler(c *gin.Context) {
	dTusHandler(c).HeadFile(c.Writer, c.Request)
}

func GetHandler(c *gin.Context) {
	dTusHandler(c).GetFile(c.Writer, c.Request)
}

func dTusHandler(c *gin.Context) *tusd.UnroutedHandler {

	store := filestore.FileStore{
		Path: "./uploads/" + c.GetString("id") + "/",
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	h, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath: "/files/",
		// BasePath:              "https://apii.kurdmake.com/files/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
		NotifyCompleteUploads:   true,
		PreUploadCreateCallback: func(hook tusd.HookEvent) error {
			println("wtf", hook.Upload.Size, hook.Upload.MetaData["name"])
			return nil
		},
	})

	if err != nil {
		fmt.Println("Unable to create a new file")
		// println("Unable to create handler: ",err.Error())
		// c.JSON(http.StatusBadRequest, gin.H{"message": "Unable to create handler: %s"})
		// return
	}
	go func() {
		// for {
		// 	event2 := <-h.CreatedUploads
		// 	println("UPLOADING", event2.Upload.ID)
		// }
		for {

			event := <-h.CompleteUploads

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

			println("Upload %s finished\n", event.Upload.ID, event.Upload.Size)
		}
	}()
	return h
}

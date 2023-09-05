package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
)

func PostHandler(c *gin.Context) {
	dir := c.MustGet("dir").(string)
	println("dir is", dir)
	dTusHandler(dir).PostFile(c.Writer, c.Request)
}

func HeadHandler(c *gin.Context) {
	dir := c.MustGet("dir").(string)
	println("dir is", dir)
	dTusHandler(dir).HeadFile(c.Writer, c.Request)
}

func PatchHandler(c *gin.Context) {
	dir := c.MustGet("dir").(string)
	println("dir is", dir)
	dTusHandler(dir).PatchFile(c.Writer, c.Request)
}

func GetHandler(c *gin.Context) {
	dir := c.MustGet("dir").(string)
	println("dir is", dir)
	dTusHandler(dir).GetFile(c.Writer, c.Request)
}

func dTusHandler(dir string) *tusd.UnroutedHandler {
	store := filestore.FileStore{
		Path: "./uploads/" + dir,
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	h, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:              "/files/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		panic(fmt.Errorf("Unable to create handler: %s", err))
	}

	go func() {
		for {
			event := <-h.CompleteUploads
			println("aaaa", dir)
			fmt.Printf("Upload %s finished\n", event.Upload.ID)
		}
	}()

	return h
}

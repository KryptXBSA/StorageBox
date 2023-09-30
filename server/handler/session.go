package handler

import (
	"github.com/AlandSleman/StorageBox/prisma"
	"github.com/AlandSleman/StorageBox/prisma/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Session(c *gin.Context) {

	userID := c.GetString("id")

	user, err := prisma.Client().User.FindFirst(
		db.User.ID.Equals(userID),
	).Exec(prisma.Context())

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to get user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

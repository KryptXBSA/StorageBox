package utils

import (
	"github.com/google/uuid"
	"strings"
)

func RandomPath() string {
	uuidObj, _ := uuid.NewRandom()
	path := uuidObj.String()
	path = removeHyphens(path)
	return path
}
func removeHyphens(input string) string {
	return strings.Replace(input, "-", "", -1)
}

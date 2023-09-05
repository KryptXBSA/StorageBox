package prisma

import (
	"context"
	"sync"

	"github.com/AlandSleman/StorageBox/prisma/db"
)

var (
	once   sync.Once
	prisma *db.PrismaClient
	ctx    context.Context
	err    error
)

// Init initializes the Prisma client once.
func Init() {
	once.Do(func() {
		prisma = db.NewClient()
		ctx = context.Background()

		if err = prisma.Prisma.Connect(); err != nil {
			panic(err)
		}
	})
}

// Client returns the initialized Prisma client.
func Client() *db.PrismaClient {
	return prisma
}

// Context returns the context used for Prisma queries.
func Context() context.Context {
	return ctx
}

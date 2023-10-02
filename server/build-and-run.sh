#!/bin/sh

# Run Prisma Client Go to apply database migrations
go run github.com/steebchen/prisma-client-go db push

# Build the Go application
go build -o main

# Start the application
./main

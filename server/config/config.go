package config

import (
	"os"
)

type ServerConfig struct {
	JWT_SECRET           string
	REDIS_URL            string
	MAX_SIZE             int64
	GITHUB_CLIENT_ID     string
	GITHUB_CLIENT_SECRET string
	GITHUB_REDIRECT_URI  string

	DISCORD_CLIENT_ID     string
	DISCORD_CLIENT_SECRET string
	DISCORD_REDIRECT_URI  string

	GOOGLE_CLIENT_ID     string
	GOOGLE_CLIENT_SECRET string
	GOOGLE_REDIRECT_URI  string
}

func GetConfig() *ServerConfig {
	config := &ServerConfig{
		JWT_SECRET:           os.Getenv("JWT_SECRET"),
		REDIS_URL:            os.Getenv("REDIS_URL"),
		MAX_SIZE:             10000000000000,
		GITHUB_CLIENT_ID:     os.Getenv("GITHUB_CLIENT_ID"),
		GITHUB_CLIENT_SECRET: os.Getenv("GITHUB_CLIENT_SECRET"),
		GITHUB_REDIRECT_URI:  os.Getenv("GITHUB_REDIRECT_URI"),

		DISCORD_CLIENT_ID:     os.Getenv("DISCORD_CLIENT_ID"),
		DISCORD_CLIENT_SECRET: os.Getenv("DISCORD_CLIENT_SECRET"),
		DISCORD_REDIRECT_URI:  os.Getenv("DISCORD_REDIRECT_URI"),

		// Load Google OAuth configuration variables here
		GOOGLE_CLIENT_ID:     os.Getenv("GOOGLE_CLIENT_ID"),
		GOOGLE_CLIENT_SECRET: os.Getenv("GOOGLE_CLIENT_SECRET"),
		GOOGLE_REDIRECT_URI:  os.Getenv("GOOGLE_REDIRECT_URI"),
	}

	return config
}

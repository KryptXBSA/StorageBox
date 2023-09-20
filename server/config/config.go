package config

import "os"

type ServerConfig struct {
	JWT_SECRET           string
	MAX_SIZE             int64
	GITHUB_CLIENT_ID     string
	GITHUB_CLIENT_SECRET string
	GITHUB_REDIRECT_URI  string

	DISCORD_CLIENT_ID     string
	DISCORD_CLIENT_SECRET string
	DISCORD_REDIRECT_URI  string
}

func GetConfig() *ServerConfig {
	config := &ServerConfig{
		JWT_SECRET:           os.Getenv("JWT_SECRET"),
		MAX_SIZE:             100000000,
		GITHUB_CLIENT_ID:     os.Getenv("GITHUB_CLIENT_ID"),
		GITHUB_CLIENT_SECRET: os.Getenv("GITHUB_CLIENT_SECRET"),
		GITHUB_REDIRECT_URI:  os.Getenv("GITHUB_REDIRECT_URI"),

		DISCORD_CLIENT_ID:     os.Getenv("DISCORD_CLIENT_ID"),
		DISCORD_CLIENT_SECRET: os.Getenv("DISCORD_CLIENT_SECRET"),
		DISCORD_REDIRECT_URI:  os.Getenv("DISCORD_REDIRECT_URI"),
	}

	return config
}

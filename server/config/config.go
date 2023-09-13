package config

import "os"

type ServerConfig struct {
	JWT_SECRET            string
	GITHUB_CLIENT_ID     string
	GITHUB_CLIENT_SECRET string
	GITHUB_REDIRECT_URI  string
}

func GetConfig() *ServerConfig {
	config := &ServerConfig{
		JWT_SECRET:            os.Getenv("JWT_SECRET"),
		GITHUB_CLIENT_ID:     os.Getenv("GITHUB_CLIENT_ID"),
		GITHUB_CLIENT_SECRET: os.Getenv("GITHUB_CLIENT_SECRET"),
		GITHUB_REDIRECT_URI:  os.Getenv("GITHUB_REDIRECT_URI"),
	}

	return config
}

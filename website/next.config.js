/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    LOCAL_SERVER_URL: process.env.LOCAL_SERVER_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GRAFANA_URL: process.env.GRAFANA_URL,
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
  }
};



const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

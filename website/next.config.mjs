/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
  }
}

export default nextConfig

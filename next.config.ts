/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    port: process.env.PORT || 8018
  },
}

module.exports = nextConfig

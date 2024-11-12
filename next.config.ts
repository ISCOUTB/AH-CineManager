/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Asegúrate de que Next.js use el puerto correcto
  serverRuntimeConfig: {
    port: process.env.PORT || 8018
  },
}

module.exports = nextConfig
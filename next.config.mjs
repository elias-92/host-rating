/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true // Si planeas usar Server Actions
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['res.cloudinary.com'] // Dominios para imágenes
  },
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI
  }
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI
  }
}

export default nextConfig

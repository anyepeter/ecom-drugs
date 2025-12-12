/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Use Cloudinary's built-in optimization instead of Next.js
    loader: 'custom',
    loaderFile: './lib/cloudinary-loader.js',
  },
}

module.exports = nextConfig

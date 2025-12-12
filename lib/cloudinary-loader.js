/**
 * Custom image loader for Cloudinary
 * Uses Cloudinary's built-in transformations instead of Next.js image optimization
 * This bypasses network timeout issues when Next.js tries to fetch external images
 */
export default function cloudinaryLoader({ src, width, quality }) {
  // If it's a Cloudinary URL, use Cloudinary transformations
  if (src.includes('res.cloudinary.com')) {
    const params = [
      'f_auto', // Auto format
      'c_limit', // Limit dimensions
      `w_${width}`, // Width
      `q_${quality || 'auto'}`, // Quality
    ]

    // Extract the image path after '/upload/'
    const uploadIndex = src.indexOf('/upload/')
    if (uploadIndex !== -1) {
      const beforeUpload = src.substring(0, uploadIndex + 8) // Include '/upload/'
      const afterUpload = src.substring(uploadIndex + 8)
      return `${beforeUpload}${params.join(',')}/${afterUpload}`
    }
  }

  // For other images (like Unsplash), return as-is
  return src
}

'use server'

import { prisma } from '@/lib/prisma'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import sharp from 'sharp'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dhvzfeomo',
  api_key: '678763769254176',
  api_secret: 'YctXRz0tgio0twtQYnjrt4GnkdE'
})

/**
 * Upload video to Cloudinary with size optimization
 */
export async function uploadProductVideo(formData: FormData): Promise<string | null> {
  const file = formData.get('video') as File

  if (!file || file.size === 0) {
    return null
  }

  // Validate file size (max 20MB)
  const maxSize = 20 * 1024 * 1024 // 20MB
  if (file.size > maxSize) {
    throw new Error('Video file size must be less than 20MB')
  }

  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary with aggressive compression
    const result = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'zmarties-products',
          resource_type: 'video',
          transformation: [
            { quality: 'auto:low' },
            { format: 'mp4' },
            { width: 800, height: 800, crop: 'limit' },
            { bit_rate: '500k' },
            { video_codec: 'h264' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result!.secure_url)
        }
      )

      uploadStream.end(buffer)
    })

    return result
  } catch (error) {
    console.error('Error uploading video:', error)
    throw new Error(`Failed to upload video: ${file.name}`)
  }
}

/**
 * Upload and optimize images to Cloudinary
 * Compresses images before upload for optimal performance
 */
export async function uploadProductImages(formData: FormData): Promise<string[]> {
  const files = formData.getAll('images') as File[]

  if (!files || files.length === 0) {
    throw new Error('No images provided')
  }

  const uploadedUrls: string[] = []

  for (const file of files) {
    try {
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Compress and optimize image using sharp
      const optimizedBuffer = await sharp(buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 85,
          progressive: true
        })
        .toBuffer()

      // Upload to Cloudinary
      const result = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'zmarties-products',
            resource_type: 'image',
            transformation: [
              { quality: 'auto:good' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result!.secure_url)
          }
        )

        uploadStream.end(optimizedBuffer)
      })

      uploadedUrls.push(result)
    } catch (error) {
      console.error('Error uploading image:', error)
      throw new Error(`Failed to upload image: ${file.name}`)
    }
  }

  return uploadedUrls
}

/**
 * Create a new product with images
 */
export async function createProduct(formData: FormData) {
  try {
    // Extract and validate form data
    const name = formData.get('name') as string
    const category = formData.get('category') as 'flowers' | 'nonflower' | 'bulk'
    const priceStr = formData.get('price') as string
    const rateStr = formData.get('rate') as string
    const flavour = formData.get('flavour') as string

    // Validation
    if (!name || !category || !priceStr || !rateStr || !flavour) {
      throw new Error('All fields are required')
    }

    const price = parseFloat(priceStr)
    const rate = parseInt(rateStr)

    if (isNaN(price) || price <= 0) {
      throw new Error('Invalid price')
    }

    if (isNaN(rate) || rate < 0 || rate > 10) {
      throw new Error('Rate must be between 0 and 10')
    }

    // Upload images to Cloudinary
    const imageUrls = await uploadProductImages(formData)

    if (imageUrls.length === 0) {
      throw new Error('At least one image is required')
    }

    // Upload video to Cloudinary (optional)
    const videoUrl = await uploadProductVideo(formData)

    // Create product in database
    const product = await prisma.product.create({
      data: {
        name,
        category,
        price,
        rate,
        flavour,
        images: imageUrls,
        video: videoUrl
      }
    })

    // Revalidate admin pages
    revalidatePath('/admin')
    revalidatePath('/admin/products')

    return { success: true, productId: product.id }
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  const [
    totalProducts,
    totalFlowers,
    totalNonFlower,
    totalBulk
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { category: 'flowers' } }),
    prisma.product.count({ where: { category: 'nonflower' } }),
    prisma.product.count({ where: { category: 'bulk' } })
  ])

  return {
    totalProducts,
    totalFlowers,
    totalNonFlower,
    totalBulk
  }
}

/**
 * Get all products (for product list page)
 */
export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return products
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

/**
 * Update an existing product
 */
export async function updateProductAction(formData: FormData) {
  try {
    // Extract product ID
    const productId = formData.get('productId') as string

    if (!productId) {
      throw new Error('Product ID is required')
    }

    // Extract and validate form data
    const name = formData.get('name') as string
    const category = formData.get('category') as 'flowers' | 'nonflower' | 'bulk'
    const priceStr = formData.get('price') as string
    const rateStr = formData.get('rate') as string
    const flavour = formData.get('flavour') as string
    const keepExistingImages = formData.get('keepExistingImages') as string
    const keepExistingVideo = formData.get('keepExistingVideo') as string

    // Validation
    if (!name || !category || !priceStr || !rateStr || !flavour) {
      throw new Error('All fields are required')
    }

    const price = parseFloat(priceStr)
    const rate = parseInt(rateStr)

    if (isNaN(price) || price <= 0) {
      throw new Error('Invalid price')
    }

    if (isNaN(rate) || rate < 0 || rate > 10) {
      throw new Error('Rate must be between 0 and 10')
    }

    // Handle images
    let imageUrls: string[] = []

    // Keep existing images if specified
    if (keepExistingImages) {
      try {
        imageUrls = JSON.parse(keepExistingImages)
      } catch {
        imageUrls = []
      }
    }

    // Upload new images if provided
    const newImages = formData.getAll('images') as File[]
    const hasNewImages = newImages.some(file => file.size > 0)

    if (hasNewImages) {
      const newImageUrls = await uploadProductImages(formData)
      imageUrls = [...imageUrls, ...newImageUrls]
    }

    if (imageUrls.length === 0) {
      throw new Error('At least one image is required')
    }

    // Handle video
    let videoUrl: string | null = null

    // Keep existing video if specified
    if (keepExistingVideo) {
      videoUrl = keepExistingVideo
    }

    // Upload new video if provided
    const newVideo = formData.get('video') as File
    if (newVideo && newVideo.size > 0) {
      videoUrl = await uploadProductVideo(formData)
    }

    // Update product in database
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        category,
        price,
        rate,
        flavour,
        images: imageUrls,
        video: videoUrl
      }
    })

    // Revalidate admin pages
    revalidatePath('/admin')
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}/edit`)

    return { success: true, productId: product.id }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

/**
 * Delete a product
 */
export async function deleteProductAction(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath('/admin')
    revalidatePath('/admin/products')

    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

/**
 * Get all products (alias for compatibility)
 */
export async function getAllProductsAction() {
  return getAllProducts()
}

/**
 * Get products by category for shop pages
 */
export async function getProductsByCategory(category?: 'flowers' | 'nonflower' | 'bulk') {
  try {
    const products = await prisma.product.findMany({
      where: category ? { category } : {},
      orderBy: {
        createdAt: 'desc'
      }
    })

    return products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

/**
 * Get products for flowers shop page
 */
export async function getFlowersProducts() {
  return getProductsByCategory('flowers')
}

/**
 * Get products for non-flower shop page
 */
export async function getNonFlowerProducts() {
  return getProductsByCategory('nonflower')
}

/**
 * Get products for bulk shop page
 */
export async function getBulkProducts() {
  return getProductsByCategory('bulk')
}

// Keep the old deleteProduct for backward compatibility
export const deleteProduct = deleteProductAction

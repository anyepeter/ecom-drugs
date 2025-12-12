'use client'

import { useState, useEffect, useTransition } from 'react'
import { getProductById, updateProductAction } from '@/lib/actions/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Loader2, CheckCircle2, Save } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product } from '@prisma/client'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [rate, setRate] = useState([5])
  const [flavour, setFlavour] = useState('')
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
  const [existingVideo, setExistingVideo] = useState<string | null>(null)
  const [newVideo, setNewVideo] = useState<File | null>(null)
  const [newVideoPreview, setNewVideoPreview] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(params.id)
      setProduct(data)

      // Prefill form
      setName(data.name)
      setCategory(data.category)
      setPrice(data.price.toString())
      setRate([data.rate])
      setFlavour(data.flavour)
      setExistingImages(data.images)
      setExistingVideo(data.video || null)
    } catch (error) {
      console.error('Failed to load product:', error)
      setMessage({ type: 'error', text: 'Failed to load product' })
    } finally {
      setLoading(false)
    }
  }

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    setNewImages(prev => [...prev, ...files])

    // Generate previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleNewVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 20MB)
      const maxSize = 20 * 1024 * 1024 // 20MB
      if (file.size > maxSize) {
        setMessage({ type: 'error', text: 'Video file size must be less than 20MB' })
        return
      }
      
      setNewVideo(file)
      const preview = URL.createObjectURL(file)
      setNewVideoPreview(preview)
    }
  }

  const removeExistingVideo = () => {
    setExistingVideo(null)
  }

  const removeNewVideo = () => {
    setNewVideo(null)
    if (newVideoPreview) {
      URL.revokeObjectURL(newVideoPreview)
      setNewVideoPreview(null)
    }
  }

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index))
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation
    if (!name || !category || !price || !flavour) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    if (existingImages.length === 0 && newImages.length === 0) {
      setMessage({ type: 'error', text: 'At least one image is required' })
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid price' })
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('productId', params.id)
        formData.append('name', name)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('rate', rate[0].toString())
        formData.append('flavour', flavour)
        formData.append('keepExistingImages', JSON.stringify(existingImages))
        if (existingVideo) {
          formData.append('keepExistingVideo', existingVideo)
        }

        // Add new images
        newImages.forEach(image => {
          formData.append('images', image)
        })

        // Add new video if provided
        if (newVideo) {
          formData.append('video', newVideo)
        }

        await updateProductAction(formData)

        setMessage({ type: 'success', text: 'Product updated successfully!' })

        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } catch (error: any) {
        console.error('Error updating product:', error)
        setMessage({ type: 'error', text: error.message || 'Failed to update product' })
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-gray-500 mb-4">Product not found</p>
            <Link href="/admin/products">
              <Button>Back to Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalImages = existingImages.length + newImages.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/products">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edit Product
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Update product details and images
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success/Error Message */}
              {message && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-md ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              )}

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} disabled={isPending}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flowers">Flowers</SelectItem>
                      <SelectItem value="nonflower">Non-Flower</SelectItem>
                      <SelectItem value="bulk">Bulk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Rating Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>
                    Rating <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-2xl font-bold text-gray-900">{rate[0]}/10</span>
                </div>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  min={0}
                  max={10}
                  step={1}
                  disabled={isPending}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Flavour */}
              <div className="space-y-2">
                <Label htmlFor="flavour">
                  Flavour <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="flavour"
                  type="text"
                  placeholder="Enter flavour"
                  value={flavour}
                  onChange={(e) => setFlavour(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>

              {/* Current Video */}
              {existingVideo && (
                <div className="space-y-3">
                  <Label>Current Video</Label>
                  <div className="relative max-w-md">
                    <video
                      src={existingVideo}
                      controls
                      className="w-full rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeExistingVideo}
                      disabled={isPending}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* New Video */}
              {newVideoPreview && (
                <div className="space-y-3">
                  <Label>New Video</Label>
                  <div className="relative max-w-md">
                    <video
                      src={newVideoPreview}
                      controls
                      className="w-full rounded-lg border-2 border-green-300"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                    <button
                      type="button"
                      onClick={removeNewVideo}
                      disabled={isPending}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload New Video */}
              <div className="space-y-2">
                <Label htmlFor="video">Add/Replace Video (Optional)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleNewVideoChange}
                    disabled={isPending}
                    className="hidden"
                  />
                  <Label
                    htmlFor="video"
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Video</span>
                  </Label>
                </div>
                <p className="text-xs text-gray-500">
                  MP4, MOV, AVI up to 20MB (will be compressed and optimized)
                </p>
              </div>

              {/* Current Images */}
              {existingImages.length > 0 && (
                <div className="space-y-3">
                  <Label>Current Images ({existingImages.length})</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {existingImages.map((imageUrl, index) => (
                      <div key={index} className="relative aspect-square group">
                        <Image
                          src={imageUrl}
                          alt={`Product image ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className="object-cover rounded-lg border-2 border-gray-200"
                          priority={false}
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          disabled={isPending}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {newImagePreviews.length > 0 && (
                <div className="space-y-3">
                  <Label>New Images ({newImages.length})</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square group">
                        <Image
                          src={preview}
                          alt={`New image ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className="object-cover rounded-lg border-2 border-green-300"
                          priority={false}
                        />
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          disabled={isPending}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div className="space-y-2">
                <Label htmlFor="images">
                  Add More Images {totalImages === 0 && <span className="text-red-500">*</span>}
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImageChange}
                    disabled={isPending}
                    className="hidden"
                  />
                  <Label
                    htmlFor="images"
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Images</span>
                  </Label>
                  <p className="text-xs text-gray-500">
                    Total: {totalImages} image{totalImages !== 1 ? 's' : ''}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Images will be automatically compressed and optimized
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating Product...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Product
                    </>
                  )}
                </Button>
                <Link href="/admin/products" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    className="w-full"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

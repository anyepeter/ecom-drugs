// @ts-nocheck
"use client"

import { useState } from 'react'
import { Eye, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAppDispatch } from '@/lib/redux/hooks'
import { addToCart, openCart } from '@/lib/redux/features/cartSlice'
import type { Product as PrismaProduct } from '@prisma/client'

// Product type definition
type Product = {
  id: string
  name: string
  price: number
  images: string[]
  video?: string | null
  flavour?: string
  rate?: number
}

// Product Modal Component
function ProductModal({ product, isOpen, onClose }: { product: Product, isOpen: boolean, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()

  const handleAddToCart = async () => {
    try {
      // Get user's IP address
      const ipResponse = await fetch('/api/get-ip')
      const ipData = await ipResponse.json()
      const userIP = ipData.ip
      
      const totalPrice = product.price * quantity
      const { trackUserAction } = await import('@/lib/actions/userActions')
      await trackUserAction('checkout', product.id, quantity, totalPrice, userIP)
    } catch (error) {
      console.error('Failed to track action:', error)
    }
    
    dispatch(addToCart({ product: product as PrismaProduct, quantity }))
    dispatch(openCart())
    onClose()
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="md:hidden">
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        {/* Desktop: Side by side | Mobile: Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Carousel Indicators */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-black w-6' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 flex flex-col">
            {/* Desktop Title */}
            <div className="hidden md:block">
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              {product.flavour && (
                <p className="text-gray-600 mt-2">
                  <span className="font-medium"></span> {product.flavour}
                </p>
              )}
              {product.rate !== undefined && (
                <p className="text-gray-600 mt-1">
                  <span className="font-medium"></span> {product.rate}/10
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity *
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-gray-300 rounded px-3 py-2"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 mt-auto">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  try {
                    // Get user's IP address
                    const ipResponse = await fetch('/api/get-ip')
                    const ipData = await ipResponse.json()
                    const userIP = ipData.ip
                    
                    const totalPrice = product.price * quantity
                    const { trackUserAction } = await import('@/lib/actions/userActions')
                    await trackUserAction('buy_now', product.id, quantity, totalPrice, userIP)
                    
                    window.open(`https://t.me/zmarties_bot?start=buy_${product.id}_${quantity}`, '_blank')
                    onClose()
                  } catch (error) {
                    console.error('Failed to track action:', error)
                    // Still proceed with buy now even if tracking fails
                    window.open(`https://t.me/zmarties_bot?start=buy_${product.id}_${quantity}`, '_blank')
                    onClose()
                  }
                }}
              >
                Buy Now
              </Button>
              <Link
                href={`/products/${product.id}`}
                className="text-gray-900 underline text-sm font-medium hover:text-gray-700"
                onClick={() => onClose()}
              >
                View More Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Product Card Component
export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Link href={`/products/${product.id}`}>
        <div
          className="group  overflow-hidden transition-all duration-300 relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image/Video */}
          <div className="aspect-[2/2] bg-gray-100 relative overflow-hidden">
            {isHovered && product.video ? (
              <video
                src={product.video}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <img
                src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            )}

            {/* Quick Details Button - Shows on Hover */}
            <div
              className={`absolute top-[85%] inset-0 bg-white/75 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
            >
              <Button
                className="bg-transparent gap-2 text-black hover:bg-transparent"
              >
                <Eye className="w-4 h-4" />
                Quick Details
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4 bg-transparent">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {product.name}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Link>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

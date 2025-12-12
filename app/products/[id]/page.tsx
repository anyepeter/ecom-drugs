"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchAllProducts } from '@/lib/redux/features/productsSlice'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  const { items: products, loading } = useAppSelector((state) => state.products)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, products.length])

  // Find the current product by ID (using string ID from database)
  const product = products.find(p => p.id === params.id)

  // Show loading state
  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            <p className="text-sm text-gray-500">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/shop" className="text-gray-600 hover:text-gray-900 underline mt-4 inline-block">
            Return to shop
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related products (same category, different id)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // Get current index in products array for prev/next navigation
  const currentIndex = products.findIndex(p => p.id === params.id)
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900">ALL PRODUCTS</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            {prevProduct && (
              <Link
                href={`/products/${prevProduct.id}`}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Link>
            )}
            {nextProduct && (
              <Link
                href={`/products/${nextProduct.id}`}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Rating & Flavour */}
            <div className="mt-6 space-y-2">
              {product.rate !== undefined && product.rate > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold">{product.rate}/10</span>
                </div>
              )}
              {product.flavour && (
                <p className="text-sm text-gray-700 capitalize">Flavour: {product.flavour}</p>
              )}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                {product.category === 'nonflower' ? 'Non Flower' : product.category === 'bulk' ? 'Bulk Only' : product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity *
              </label>
              <div className="flex items-center gap-3 max-w-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-xl"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center border border-gray-300 rounded px-3 py-2 h-10"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white uppercase tracking-wide"
                  onClick={() => {
                    alert(`Added ${quantity} x ${product.name} to cart!`)
                  }}
                >
                  Add to Cart
                </Button>
                <button
                  className="w-12 h-12 flex items-center justify-center border-2 border-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
                  onClick={() => {
                    alert('Added to wishlist!')
                  }}
                >
                  ❤
                </button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white uppercase tracking-wide"
                onClick={() => {
                  alert('Proceeding to checkout...')
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchAllProducts } from '@/lib/redux/features/productsSlice'

export default function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { items: products, loading } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, products.length])

  // Get first 6 products for featured section
  const flowerProducts = products.filter(p => p.category === 'flowers').slice(0, 4)
  const nonFlowerProducts = products.filter(p => p.category === 'nonflower').slice(0, 4)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of top-quality products
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && flowerProducts.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
              {flowerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <Link href="/shop/flowers">
                <Button
                  size="sm"
                  className="bg-transparent text-black border border-black hover:text-white hover:bg-gray-800 px-6 py-4 text-lg "
                >
                  More flowers
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}

{!loading && nonFlowerProducts.length > 0 && (
          <>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
              {nonFlowerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <Link href="/shop/non-flowers">
                <Button
                  size="sm"
                  className="bg-transparent text-black border border-black hover:text-white hover:bg-gray-800 px-6 py-4 text-lg "
                >
                  More non flowers
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && flowerProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">No products available at the moment.</p>
            <Link href="/shop">
              <Button variant="outline">Visit Shop</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

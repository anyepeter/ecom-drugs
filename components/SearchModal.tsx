"use client"

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/lib/redux/hooks'
import Link from 'next/link'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { items: products } = useAppSelector((state) => state.products)

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
    }
  }, [isOpen])

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.flavour?.toLowerCase().includes(query)
    )
  })

  // Show results only if there's a search query
  const showResults = searchQuery.trim().length > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products by name, category, or flavour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {showResults ? (
            <>
              {filteredProducts.length > 0 ? (
                <div className="p-2">
                  <p className="text-sm text-gray-500 px-3 py-2">
                    {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="space-y-1">
                    {filteredProducts.slice(0, 10).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 capitalize">
                            {product.category === 'nonflower' ? 'Non Flower' : product.category}
                            {product.flavour && ` • ${product.flavour}`}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {filteredProducts.length > 10 && (
                    <p className="text-sm text-gray-500 px-3 py-3 text-center">
                      Showing first 10 results. Refine your search to see more.
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                  <p className="text-sm text-gray-500">
                    Try searching with different keywords
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Search Products</h3>
              <p className="text-sm text-gray-500">
                Start typing to search for products...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

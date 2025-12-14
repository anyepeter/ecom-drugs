"use client"

import { useState, useEffect } from 'react'
import { Filter, X, Loader2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import Pagination from '@/components/Pagination'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchFlowersProducts } from '@/lib/redux/features/productsSlice'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

export default function FlowersPage() {
  const dispatch = useAppDispatch()
  const { items: products, loading, error } = useAppSelector((state) => state.products)

  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([10, 1500])
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const PRODUCTS_PER_PAGE = 12

  // Fetch flowers products on mount
  useEffect(() => {
    dispatch(fetchFlowersProducts())
  }, [dispatch])

  // Get unique flavours from products
  const availableFlavours = Array.from(new Set(products.map(p => p.flavour)))
    .filter(Boolean)
    .sort()

  // Filter products
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Flavour filter
    if (selectedFlavours.length > 0 && !selectedFlavours.includes(product.flavour)) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [priceRange, selectedFlavours, sortBy])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Flowers</h1>
            <p className="text-gray-600 mt-2">Premium flower products</p>
          </div>

          {/* Mobile Filter & Sort Bar */}
          <div className="lg:hidden flex items-center justify-between mb-6 gap-3">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle>Filters</SheetTitle>
                  {/* <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose> */}
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    priceMin={10}
                    priceMax={1500}
                    priceStep={10}
                    selectedFlavours={selectedFlavours}
                    setSelectedFlavours={setSelectedFlavours}
                    availableFlavours={availableFlavours}
                  />
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Button
                    className="w-full"
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    Show {sortedProducts.length} Products
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 max-w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white">
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  priceMin={10}
                  priceMax={1500}
                  priceStep={10}
                  selectedFlavours={selectedFlavours}
                  setSelectedFlavours={setSelectedFlavours}
                  availableFlavours={availableFlavours}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <p className="text-sm text-gray-500">Loading products...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button
                    onClick={() => dispatch(fetchFlowersProducts())}
                    className="mt-4"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {/* Product Grid */}
              {!loading && !error && (
                <>
                  {sortedProducts.length > 0 ? (
                    <>
                      <div className="grid grid  grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {paginatedProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No products found matching your filters.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Product data - Bulk Only
const products = [
  { id: 10, name: 'Resin Extract - OG Kush', price: 65.00, image: '/products/resin-extract.jpg', category: 'bulk-only', flavor: 'exotic' },
  { id: 11, name: 'Delta-8 Cartridge', price: 40.00, image: '/products/delta8-cart.jpg', category: 'bulk-only', flavor: 'exotic' },
  { id: 12, name: 'Premium Hash', price: 120.00, image: '/products/premium-hash.jpg', category: 'bulk-only', flavor: 'exotic' },
]

const flavors = [
  { id: 'cake', name: 'Cake' },
  { id: 'candy', name: 'Candy' },
  { id: 'cereal', name: 'Cereal' },
  { id: 'exotic', name: 'Exotic' },
  { id: 'gelato', name: 'Gelato' },
  { id: 'slurpee', name: 'Slurpee' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

interface FilterSidebarProps {
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  selectedFlavors: string[]
  setSelectedFlavors: (value: string[]) => void
}

function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedFlavors,
  setSelectedFlavors
}: FilterSidebarProps) {
  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors(
      selectedFlavors.includes(flavorId)
        ? selectedFlavors.filter(id => id !== flavorId)
        : [...selectedFlavors, flavorId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter by Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Filter by</h2>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Price Filter */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
            Price
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="mt-2 px-1">
              <Slider
                min={10}
                max={1500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-600">${priceRange[0]}</span>
                <span className="text-xs text-gray-600">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Flavor Filter */}
        <AccordionItem value="flavor" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
            Flavor
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {flavors.map((flavor) => (
                <label key={flavor.id} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFlavors.includes(flavor.id)}
                    onChange={() => toggleFlavor(flavor.id)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                    {flavor.name}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 bg-white">
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-base sm:text-lg font-semibold text-gray-900">
          ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  )
}

export default function BulkOnlyPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([10, 1500])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Filter products
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Flavor filter
    if (selectedFlavors.length > 0 && !selectedFlavors.includes(product.flavor)) {
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Bulk Only</h1>
            <p className="text-gray-600 mt-2">Premium bulk products for serious buyers</p>
          </div>

          {/* Mobile Filter & Sort Bar */}
          <div className="lg:hidden flex items-center justify-between mb-6 gap-3">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                {/* <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose> */}
                {/* </SheetHeader> */}
                <div className="mt-6">
                  <FilterSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedFlavors={selectedFlavors}
                    setSelectedFlavors={setSelectedFlavors}
                  />
                </div>
                <div className="mt-6 pt-6">
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
              <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6">
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedFlavors={selectedFlavors}
                  setSelectedFlavors={setSelectedFlavors}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-end mb-6">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
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

              {/* Product Grid - Mobile First */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* No results message */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

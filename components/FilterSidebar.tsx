import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Category {
  id: string
  name: string
}

interface FilterSidebarProps {
  // Price filter
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  priceMin?: number
  priceMax?: number
  priceStep?: number

  // Flavour filter
  selectedFlavours: string[]
  setSelectedFlavours: (value: string[]) => void
  availableFlavours: string[]

  // Optional category filter
  categories?: Category[]
  selectedCategory?: string
  setSelectedCategory?: (value: string) => void
}

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  priceMin = 10,
  priceMax = 1500,
  priceStep = 10,
  selectedFlavours,
  setSelectedFlavours,
  availableFlavours,
  categories,
  selectedCategory,
  setSelectedCategory
}: FilterSidebarProps) {
  const toggleFlavour = (flavour: string) => {
    setSelectedFlavours(
      selectedFlavours.includes(flavour)
        ? selectedFlavours.filter(f => f !== flavour)
        : [...selectedFlavours, flavour]
    )
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full">
        {/* Category Filter - Optional */}
        {categories && selectedCategory && setSelectedCategory && (
          <AccordionItem value="category" className="border-b border-gray-200">
            <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
              Category
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                    />
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Filter */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
            Price
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="px-1">
              <Slider
                min={priceMin}
                max={priceMax}
                step={priceStep}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-600">${priceRange[0]}</span>
                <span className="text-xs text-gray-600">
                  ${priceMax > 2000 ? priceRange[1].toLocaleString() : priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Flavour Filter */}
        {availableFlavours.length > 0 && (
          <AccordionItem value="flavour" className="border-b border-gray-200">
            <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline py-4">
              Flavour
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {availableFlavours.map((flavour) => (
                  <label key={flavour} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedFlavours.includes(flavour)}
                      onChange={() => toggleFlavour(flavour)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                      {flavour}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}

import { Product } from '@/types/product'

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Pink Gumbo (MD)',
    price: 1000.00,
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1623244455711-74e2f1f6bd56?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612305876994-0d1da11e67c3?w=800&h=800&fit=crop'
    ],
    category: 'flowers',
    flavor: 'exotic',
    description: 'Premium Pink Gumbo strain from Maryland',
    rating: '10/10',
    type: 'Indoor candy'
  },
  {
    id: 2,
    name: 'Pink Gumbo',
    price: 1250.00,
    images: [
      'https://images.unsplash.com/photo-1612305876994-0d1da11e67c3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1623244455711-74e2f1f6bd56?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&h=800&fit=crop'
    ],
    category: 'flowers',
    flavor: 'exotic',
    description: 'High-quality Pink Gumbo strain',
    rating: '10/10',
    type: 'Indoor candy'
  },
  {
    id: 3,
    name: 'Blueberry Crunch Berries',
    price: 1500.00,
    images: [
      'https://images.unsplash.com/photo-1582576163655-acd5e0b1d56a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587155209549-68541c7a46d3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&h=800&fit=crop'
    ],
    category: 'flowers',
    flavor: 'cereal',
    description: 'Sweet cereal-flavored premium flower',
    rating: '9/10',
    type: 'Indoor candy'
  },
  {
    id: 4,
    name: 'Strawberry PopTarts',
    price: 1350.00,
    images: [
      'https://images.unsplash.com/photo-1587155209549-68541c7a46d3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582576163655-acd5e0b1d56a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1623244455711-74e2f1f6bd56?w=800&h=800&fit=crop'
    ],
    category: 'flowers',
    flavor: 'cake',
    description: 'Delicious cake-flavored strain',
    rating: '10/10',
    type: 'Indoor candy'
  },
  {
    id: 5,
    name: 'PHX Guarnto',
    price: 1200.00,
    images: [
      'https://images.unsplash.com/photo-1623244455711-74e2f1f6bd56?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612305876994-0d1da11e67c3?w=800&h=800&fit=crop'
    ],
    category: 'flowers',
    flavor: 'exotic',
    description: 'Exotic Phoenix Guarnto strain',
    rating: '9/10',
    type: 'Indoor candy'
  },
  {
    id: 6,
    name: 'CryBaby Gummies',
    price: 45.00,
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588001279540-db055b69c61c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1631286876697-d0d6a40a94aa?w=800&h=800&fit=crop'
    ],
    category: 'non-flowers',
    flavor: 'candy',
    description: 'Delicious candy gummies',
    rating: '10/10',
    type: 'Edibles'
  },
  {
    id: 7,
    name: 'Zmarties Branded Edibles',
    price: 35.00,
    images: [
      'https://images.unsplash.com/photo-1588001279540-db055b69c61c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1631286876697-d0d6a40a94aa?w=800&h=800&fit=crop'
    ],
    category: 'non-flowers',
    flavor: 'candy',
    description: 'Official Zmarties edibles',
    rating: '10/10',
    type: 'Edibles'
  },
  {
    id: 8,
    name: 'Mushroom Blend',
    price: 85.00,
    images: [
      'https://images.unsplash.com/photo-1631286876697-d0d6a40a94aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588001279540-db055b69c61c?w=800&h=800&fit=crop'
    ],
    category: 'non-flowers',
    flavor: 'exotic',
    description: 'Premium mushroom blend',
    rating: '9/10',
    type: 'Specialty'
  },
  {
    id: 9,
    name: 'Disposable Vape - Blue Dream',
    price: 25.00,
    images: [
      'https://images.unsplash.com/photo-1598810059888-05f6d28a6ad0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609846729925-e9c3c2fbb5fb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591622879870-b80d40b41023?w=800&h=800&fit=crop'
    ],
    category: 'non-flowers',
    flavor: 'exotic',
    description: 'Blue Dream disposable vape',
    rating: '10/10',
    type: 'Vape'
  },
  {
    id: 10,
    name: 'Resin Extract - OG Kush',
    price: 65.00,
    images: [
      'https://images.unsplash.com/photo-1609846729925-e9c3c2fbb5fb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598810059888-05f6d28a6ad0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591622879870-b80d40b41023?w=800&h=800&fit=crop'
    ],
    category: 'bulk-only',
    flavor: 'exotic',
    description: 'OG Kush resin extract',
    rating: '10/10',
    type: 'Extract'
  },
  {
    id: 11,
    name: 'Delta-8 Cartridge',
    price: 40.00,
    images: [
      'https://images.unsplash.com/photo-1591622879870-b80d40b41023?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598810059888-05f6d28a6ad0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609846729925-e9c3c2fbb5fb?w=800&h=800&fit=crop'
    ],
    category: 'bulk-only',
    flavor: 'exotic',
    description: 'Premium Delta-8 cartridge',
    rating: '9/10',
    type: 'Cartridge'
  },
  {
    id: 12,
    name: 'Premium Hash',
    price: 120.00,
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612305876994-0d1da11e67c3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1623244455711-74e2f1f6bd56?w=800&h=800&fit=crop'
    ],
    category: 'bulk-only',
    flavor: 'exotic',
    description: 'High-quality premium hash',
    rating: '10/10',
    type: 'Hash'
  },
]

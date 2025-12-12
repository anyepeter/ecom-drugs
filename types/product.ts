export interface Product {
  id: number
  name: string
  price: number
  images: string[]
  video?: string | null
  category: 'flowers' | 'non-flowers' | 'bulk-only'
  flavor: string
  description: string
  rating?: string
  type?: string
}

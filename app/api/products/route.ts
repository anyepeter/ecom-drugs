import { NextResponse } from 'next/server'
import { getAllProducts, getProductsByCategory } from '@/lib/actions/products'

// Force dynamic rendering - don't execute during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let products
    if (category && category !== 'all') {
      products = await getProductsByCategory(category as 'flowers' | 'nonflower' | 'bulk')
    } else {
      products = await getAllProducts()
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

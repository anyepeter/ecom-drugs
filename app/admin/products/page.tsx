'use client'

import { useState, useEffect } from 'react'
import { getAllProductsAction } from '@/lib/actions/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import Image from 'next/image'
import DeleteProductModal from '@/components/admin/DeleteProductModal'
// Product type definition
type Product = {
  id: string
  name: string
  category: 'flowers' | 'nonflower' | 'bulk'
  price: number
  rate: number
  flavour: string
  images: string[]
  video?: string | null
  createdAt: Date
  updatedAt: Date
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean
    productId: string
    productName: string
  }>({
    open: false,
    productId: '',
    productName: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProductsAction()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'flowers':
        return 'bg-pink-100 text-pink-800'
      case 'nonflower':
        return 'bg-purple-100 text-purple-800'
      case 'bulk':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openDeleteModal = (productId: string, productName: string) => {
    setDeleteModal({ open: true, productId, productName })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, productId: '', productName: '' })
    loadProducts() // Refresh products after deletion
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Products
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {products.length} total product{products.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-500 mb-4">No products found</p>
              <Link href="/admin/add-product">
                <Button>Add Your First Product</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Flavour</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100">
                            {product.images && product.images.length > 0 && product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                                priority={false}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                                No img
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium max-w-[200px]">
                          <div className="truncate">{product.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {product.images.length} image{product.images.length !== 1 ? 's' : ''}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(product.category)}>
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{product.rate}</span>
                            <span className="text-xs text-gray-500">/10</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <div className="truncate text-sm">{product.flavour}</div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(product.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => openDeleteModal(product.id, product.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.images && product.images.length > 0 && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                          priority={false}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-base truncate">{product.name}</h3>
                        <Badge className={`${getCategoryColor(product.category)} text-xs flex-shrink-0`}>
                          {product.category}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold">
                            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium">{product.rate}/10</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Flavour:</span>
                          <span className="truncate ml-2 max-w-[150px]">{product.flavour}</span>
                        </div>
                        <div className="text-xs text-gray-500 pt-1">
                          Added {new Date(product.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => openDeleteModal(product.id, product.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        href="/admin/add-product"
        className="fixed bottom-6 right-6 z-50 shadow-2xl hover:shadow-xl transition-shadow"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>

      {/* Delete Modal */}
      <DeleteProductModal
        productId={deleteModal.productId}
        productName={deleteModal.productName}
        open={deleteModal.open}
        onOpenChange={closeDeleteModal}
      />
    </div>
  )
}

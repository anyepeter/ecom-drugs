'use client'

import { useState, useEffect } from 'react'
import { getAllUserActions } from '@/lib/actions/userActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Zap, Loader2, ChevronLeft, ChevronRight, Globe } from 'lucide-react'

type UserAction = {
  id: string
  action: string
  productId: string | null
  quantity: number
  totalPrice: number | null
  ipAddress: string | null
  country: string | null
  createdAt: Date
}

export default function AllRecordsPage() {
  const [actions, setActions] = useState<UserAction[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const recordsPerPage = 50

  useEffect(() => {
    loadActions(currentPage)
  }, [currentPage])

  const loadActions = async (page: number) => {
    try {
      setLoading(true)
      const data = await getAllUserActions(page, recordsPerPage)
      setActions(data.actions)
      setTotalPages(data.totalPages)
      setTotalCount(data.totalCount)
      setCurrentPage(data.currentPage)
    } catch (error) {
      console.error('Failed to load actions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (loading && actions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading records...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin-two">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  All User Actions
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Total records: {totalCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Actions Records</CardTitle>
          </CardHeader>
          <CardContent>
            {actions.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {actions.map((action) => (
                        <tr key={action.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {action.action === 'checkout' ? (
                                <ShoppingCart className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Zap className="w-4 h-4 text-green-600" />
                              )}
                              <span className="text-sm font-medium text-gray-900">
                                {action.action === 'checkout' ? 'Checkout' : 'Buy Now'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {action.productId ? (
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {action.productId.substring(0, 8)}...
                              </code>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {action.quantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {action.totalPrice ? `$${action.totalPrice.toFixed(2)}` : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {action.ipAddress || '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {action.country ? (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{action.country}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <div>{new Date(action.createdAt).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(action.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {actions.map((action) => (
                    <div key={action.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {action.action === 'checkout' ? (
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Zap className="w-5 h-5 text-green-600" />
                          )}
                          <span className="font-medium">
                            {action.action === 'checkout' ? 'Checkout' : 'Buy Now'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Qty: {action.quantity}
                        </span>
                      </div>

                      {action.totalPrice && (
                        <div className="text-sm mb-2">
                          <span className="text-gray-600">Total: </span>
                          <span className="font-semibold">${action.totalPrice.toFixed(2)}</span>
                        </div>
                      )}

                      {action.country && (
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{action.country}</span>
                        </div>
                      )}

                      {action.ipAddress && (
                        <div className="text-xs text-gray-500 mb-2">
                          IP: {action.ipAddress}
                        </div>
                      )}

                      <div className="text-xs text-gray-400 mt-3 pt-3 border-t">
                        {new Date(action.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-gray-700">
                    Showing page {currentPage} of {totalPages} ({totalCount} total records)
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1 || loading}
                      className="gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages || loading}
                      className="gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">No records found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

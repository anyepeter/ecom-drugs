'use client'

import { useState, useEffect } from 'react'
import { getAllUserActions } from '@/lib/actions/userActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Zap, Loader2, ChevronLeft, ChevronRight, Globe, ChevronDown, ChevronUp } from 'lucide-react'

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

type GroupedActions = {
  ipAddress: string
  country: string | null
  actionCount: number
  actions: UserAction[]
  latestAction: Date
}

export default function AllRecordsPage() {
  const [actionsGrouped, setActionsGrouped] = useState<GroupedActions[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalGroups, setTotalGroups] = useState(0)
  const [expandedIPs, setExpandedIPs] = useState<Set<string>>(new Set())
  const recordsPerPage = 20

  useEffect(() => {
    loadActions(currentPage)
  }, [currentPage])

  const loadActions = async (page: number) => {
    try {
      setLoading(true)
      const data = await getAllUserActions(page, recordsPerPage)
      setActionsGrouped(data.actionsGrouped)
      setTotalPages(data.totalPages)
      setTotalCount(data.totalCount)
      setTotalGroups(data.totalGroups)
      setCurrentPage(data.currentPage)
    } catch (error) {
      console.error('Failed to load actions:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleIPExpansion = (ipAddress: string) => {
    setExpandedIPs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(ipAddress)) {
        newSet.delete(ipAddress)
      } else {
        newSet.add(ipAddress)
      }
      return newSet
    })
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

  if (loading && actionsGrouped.length === 0) {
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
                  {totalGroups} unique IPs • {totalCount} total actions
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
            {actionsGrouped.length > 0 ? (
              <>
                {/* Grouped IP View */}
                <div className="space-y-3">
                  {actionsGrouped.map((group) => (
                    <div key={group.ipAddress} className="border rounded-lg overflow-hidden">
                      {/* IP Address Header */}
                      <button
                        onClick={() => toggleIPExpansion(group.ipAddress)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedIPs.has(group.ipAddress) ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                          <div className="text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-gray-900">{group.ipAddress}</p>
                              {group.country && (
                                <div className="flex items-center gap-1">
                                  <Globe className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{group.country}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {group.actionCount} action{group.actionCount > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          Latest: {new Date(group.latestAction).toLocaleDateString()}
                        </div>
                      </button>

                      {/* Expanded Actions */}
                      {expandedIPs.has(group.ipAddress) && (
                        <div className="bg-white">
                          {/* Desktop Table for expanded items */}
                          <div className="hidden md:block">
                            <table className="w-full">
                              <thead className="bg-gray-100 border-y">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product ID</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {group.actions.map((action) => (
                                  <tr key={action.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        {action.action === 'checkout' ? (
                                          <ShoppingCart className="w-4 h-4 text-blue-600" />
                                        ) : (
                                          <Zap className="w-4 h-4 text-green-600" />
                                        )}
                                        <span className="text-sm">
                                          {action.action === 'checkout' ? 'Checkout' : 'Buy Now'}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                      {action.productId ? (
                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                          {action.productId.substring(0, 8)}...
                                        </code>
                                      ) : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">{action.quantity}</td>
                                    <td className="px-4 py-3 text-sm">
                                      {action.totalPrice ? `$${action.totalPrice.toFixed(2)}` : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">
                                      <div>{new Date(action.createdAt).toLocaleDateString()}</div>
                                      <div className="text-gray-400">
                                        {new Date(action.createdAt).toLocaleTimeString()}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Mobile Card View for expanded items */}
                          <div className="md:hidden divide-y">
                            {group.actions.map((action) => (
                              <div key={action.id} className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {action.action === 'checkout' ? (
                                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                                    ) : (
                                      <Zap className="w-4 h-4 text-green-600" />
                                    )}
                                    <span className="text-sm font-medium">
                                      {action.action === 'checkout' ? 'Checkout' : 'Buy Now'}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-500">Qty: {action.quantity}</span>
                                </div>
                                {action.totalPrice && (
                                  <p className="text-sm mb-1">
                                    Total: <span className="font-semibold">${action.totalPrice.toFixed(2)}</span>
                                  </p>
                                )}
                                <p className="text-xs text-gray-400">
                                  {new Date(action.createdAt).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-gray-700">
                    Showing page {currentPage} of {totalPages} ({totalGroups} unique IPs • {totalCount} total actions)
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

'use client'

import { useState, useEffect } from 'react'
import { getUserActionStats } from '@/lib/actions/userActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Zap, TrendingUp, Clock, Loader2, FileText, ChevronDown, ChevronRight } from 'lucide-react'

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

type UserActionStats = {
  totalCheckouts: number
  totalBuyNows: number
  todayCheckouts: number
  todayBuyNows: number
  recentActions: UserAction[]
  recentActionsGrouped: GroupedActions[]
}

export default function AdminTwoDashboard() {
  const [stats, setStats] = useState<UserActionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedIPs, setExpandedIPs] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadStats()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const data = await getUserActionStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
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

  const statsCards = stats ? [
    {
      title: 'Total Checkouts',
      value: stats.totalCheckouts,
      icon: ShoppingCart,
      description: 'Unique users (by IP)',
      color: 'text-blue-600'
    },
    {
      title: 'Total Buy Now',
      value: stats.totalBuyNows,
      icon: Zap,
      description: 'Unique users (by IP)',
      color: 'text-green-600'
    },
    {
      title: 'Today Checkouts',
      value: stats.todayCheckouts,
      icon: TrendingUp,
      description: 'Unique users today (by IP)',
      color: 'text-purple-600'
    },
    {
      title: 'Today Buy Now',
      value: stats.todayBuyNows,
      icon: Clock,
      description: 'Unique users today (by IP)',
      color: 'text-orange-600'
    }
  ] : []

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
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
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  User Actions Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track checkout and buy now submissions
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/admin-two/all-records">
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  All Records
                </Button>
              </Link>
              <Button onClick={loadStats} disabled={loading} className="gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Actions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Actions</CardTitle>
            <Link href="/admin-two/all-records">
              <Button variant="outline" size="sm">
                View All Records
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentActionsGrouped && stats.recentActionsGrouped.length > 0 ? (
              <div className="space-y-3">
                {stats.recentActionsGrouped.map((group) => (
                  <div key={group.ipAddress} className="border rounded-lg overflow-hidden">
                    {/* IP Address Header - Clickable to expand/collapse */}
                    <button
                      onClick={() => toggleIPExpansion(group.ipAddress)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {expandedIPs.has(group.ipAddress) ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                              {group.ipAddress}
                            </p>
                            {group.country && (
                              <span className="text-sm text-gray-600">• {group.country}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {group.actionCount} action{group.actionCount > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        {new Date(group.latestAction).toLocaleDateString()}
                      </div>
                    </button>

                    {/* Expanded Actions */}
                    {expandedIPs.has(group.ipAddress) && (
                      <div className="bg-white divide-y">
                        {group.actions.map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              {action.action === 'checkout' ? (
                                <ShoppingCart className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Zap className="w-4 h-4 text-green-600" />
                              )}
                              <div>
                                <p className="text-sm font-medium">
                                  {action.action === 'checkout' ? 'Checkout' : 'Buy Now'}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Quantity: {action.quantity}
                                  {action.totalPrice && ` • Total: $${action.totalPrice.toFixed(2)}`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">
                                {new Date(action.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(action.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent actions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
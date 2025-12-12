import { getDashboardStats } from '@/lib/actions/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package, Flower2, ShoppingBag, Boxes, Plus } from 'lucide-react'

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      description: 'All products in inventory',
      color: 'text-blue-600'
    },
    {
      title: 'Flowers',
      value: stats.totalFlowers,
      icon: Flower2,
      description: 'Flower category products',
      color: 'text-pink-600'
    },
    {
      title: 'Non-Flower',
      value: stats.totalNonFlower,
      icon: ShoppingBag,
      description: 'Non-flower products',
      color: 'text-purple-600'
    },
    {
      title: 'Bulk Items',
      value: stats.totalBulk,
      icon: Boxes,
      description: 'Bulk category products',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your Zmarties inventory
              </p>
            </div>
            <Link href="/admin/add-product">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </Link>
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/admin/add-product" className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Plus className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Add Product</div>
                    <div className="text-xs text-gray-500">Create new product</div>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/products" className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Package className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">View Products</div>
                    <div className="text-xs text-gray-500">Manage inventory</div>
                  </div>
                </Button>
              </Link>

              <Link href="/shop" className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <ShoppingBag className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">View Store</div>
                    <div className="text-xs text-gray-500">Public shop view</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

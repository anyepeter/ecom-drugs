"use client"

import { X, Minus, Plus, ShoppingBag, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { closeCart, removeFromCart, updateQuantity, clearCart } from '@/lib/redux/features/cartSlice'
import { trackUserAction } from '@/lib/actions/userActions'

export default function Cart() {
  const dispatch = useAppDispatch()
  const { items, isOpen } = useAppSelector((state) => state.cart)

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Handle checkout via Telegram
  const handleCheckout = async () => {
    if (items.length === 0) return

    try {
      console.log('Starting to track checkout action...')
      
      // Get user's IP address
      const ipResponse = await fetch('/api/get-ip')
      const ipData = await ipResponse.json()
      const userIP = ipData.ip
      
      const result = await trackUserAction('checkout', 'cart', items.length, subtotal, userIP)
      console.log('Tracking result:', result)
    } catch (error) {
      console.error('Failed to track action:', error)
    }
        

    // Format cart items as a message
    let message = "🛒 **New Order from Zmarties Website**\n\n"
    message += "**Items:**\n"

    items.forEach((item, index) => {
      message += `\n${index + 1}. **${item.product.name}**\n`
      message += `   • Quantity: ${item.quantity}\n`
      message += `   • Price: $${item.product.price.toFixed(2)} each\n`
      message += `   • Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n`
      if (item.product.flavour) {
        message += `   • Flavour: ${item.product.flavour}\n`
      }
    })

    message += `\n━━━━━━━━━━━━━━━\n`
    message += `**Total Items:** ${itemCount}\n`
    message += `**Total Amount:** $${subtotal.toFixed(2)}\n\n`

    // Add all product images at the end
    message += `**Product Images:**\n`
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n${item.product.images[0]}\n\n`
    })

    message += `Please confirm this order and provide delivery details.`

    // URL encode the message
    const encodedMessage = encodeURIComponent(message)

    // Open Telegram with the message
    const telegramUrl = `https://t.me/the_zmarties?text=${encodedMessage}`
    window.open(telegramUrl, '_blank')

    // Optional: Clear cart after checkout
    dispatch(clearCart())
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some products to get started</p>
              <Button onClick={() => dispatch(closeCart())}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{item.product.flavour}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(updateQuantity({
                          productId: item.product.id,
                          quantity: item.quantity - 1
                        }))}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({
                          productId: item.product.id,
                          quantity: item.quantity + 1
                        }))}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white text-lg py-6"
              onClick={handleCheckout}
            >
              <Send className="mr-2 h-5 w-5" />
              Checkout
            </Button>

            {/* Clear Cart Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (confirm('Are you sure you want to clear your cart?')) {
                  dispatch(clearCart())
                }
              }}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

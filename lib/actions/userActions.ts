'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Track user action (checkout or buy_now)
 */
export async function trackUserAction(
  action: 'checkout' | 'buy_now', 
  productId?: string, 
  quantity: number = 1,
  totalPrice?: number,
  ipAddress?: string
) {
  try {
   
    await prisma.userAction.create({
      data: {
        action,
        productId,
        quantity,
        totalPrice,
        ipAddress
      }
    })

    revalidatePath('/admin-two')
    console.log('Tracking user action:')
    return { success: true }
  } catch (error) {
    console.error('Error tracking user action:', error)
    throw new Error('Failed to track user action')
  }
}

/**
 * Get user action statistics
 */
export async function getUserActionStats() {
  try {
    const [
      totalCheckouts,
      totalBuyNows,
      todayCheckouts,
      todayBuyNows,
      recentActions
    ] = await Promise.all([
      prisma.userAction.count({ where: { action: 'checkout' } }),
      prisma.userAction.count({ where: { action: 'buy_now' } }),
      prisma.userAction.count({
        where: {
          action: 'checkout',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.userAction.count({
        where: {
          action: 'buy_now',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.userAction.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          productId: true,
          quantity: true,
          totalPrice: true,
          ipAddress: true,
          createdAt: true
        }
      })
    ])

    return {
      totalCheckouts,
      totalBuyNows,
      todayCheckouts,
      todayBuyNows,
      recentActions
    }
  } catch (error) {
    console.error('Error fetching user action stats:', error)
    throw new Error('Failed to fetch user action statistics')
  }
}
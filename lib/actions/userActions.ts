'use server'
"@ts-nocheck"
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCountryFromIP } from '@/lib/utils/geolocation'

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
    // Detect country from IP address
    const country = ipAddress ? await getCountryFromIP(ipAddress) : null

    await prisma.userAction.create({
      data: {
        action,
        productId,
        quantity,
        totalPrice,
        ipAddress,
        country
      }
    })

    revalidatePath('/admin-two')
    console.log('Tracking user action:', { action, country })
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
      allCheckouts,
      allBuyNows,
      todayCheckoutsData,
      todayBuyNowsData,
      recentActions
    ] = await Promise.all([
      // Get all checkout actions with distinct IP addresses
      prisma.userAction.findMany({
        where: { action: 'checkout' },
        select: { ipAddress: true },
        distinct: ['ipAddress']
      }),
      // Get all buy_now actions with distinct IP addresses
      prisma.userAction.findMany({
        where: { action: 'buy_now' },
        select: { ipAddress: true },
        distinct: ['ipAddress']
      }),
      // Get today's checkout actions with distinct IP addresses
      prisma.userAction.findMany({
        where: {
          action: 'checkout',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        },
        select: { ipAddress: true },
        distinct: ['ipAddress']
      }),
      // Get today's buy_now actions with distinct IP addresses
      prisma.userAction.findMany({
        where: {
          action: 'buy_now',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        },
        select: { ipAddress: true },
        distinct: ['ipAddress']
      }),
      prisma.userAction.findMany({
        take: 100, // Get more actions to group by IP
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          productId: true,
          quantity: true,
          totalPrice: true,
          ipAddress: true,
          country: true,
          createdAt: true
        }
      })
    ])

    // Count unique IP addresses
    const totalCheckouts = allCheckouts.length
    const totalBuyNows = allBuyNows.length
    const todayCheckouts = todayCheckoutsData.length
    const todayBuyNows = todayBuyNowsData.length

    // Group recent actions by IP address
    const groupedByIP = recentActions.reduce((acc, action) => {
      const ip = action.ipAddress || 'unknown'
      if (!acc[ip]) {
        acc[ip] = []
      }
      acc[ip].push(action)
      return acc
    }, {} as Record<string, typeof recentActions>)

    // Convert to array and sort by most recent action
    const recentActionsGrouped = Object.entries(groupedByIP)
      .map(([ipAddress, actions]) => ({
        ipAddress,
        country: actions[0].country, // Use country from first action
        actionCount: actions.length,
        actions: actions.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        latestAction: actions[0].createdAt
      }))
      .sort((a, b) =>
        new Date(b.latestAction).getTime() - new Date(a.latestAction).getTime()
      )
      .slice(0, 20) // Limit to 20 unique IPs

    return {
      totalCheckouts,
      totalBuyNows,
      todayCheckouts,
      todayBuyNows,
      recentActions,
      recentActionsGrouped
    }
  } catch (error) {
    console.error('Error fetching user action stats:', error)
    throw new Error('Failed to fetch user action statistics')
  }
}

/**
 * Get all user actions with pagination and grouping by IP
 */
export async function getAllUserActions(page: number = 1, limit: number = 50) {
  try {
    // First, get all unique IP addresses with pagination
    const allActions = await prisma.userAction.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        action: true,
        productId: true,
        quantity: true,
        totalPrice: true,
        ipAddress: true,
        country: true,
        createdAt: true
      }
    })

    // Group by IP address
    const groupedByIP = allActions.reduce((acc, action) => {
      const ip = action.ipAddress || 'unknown'
      if (!acc[ip]) {
        acc[ip] = []
      }
      acc[ip].push(action)
      return acc
    }, {} as Record<string, typeof allActions>)

    // Convert to array and sort by most recent action
    const allGrouped = Object.entries(groupedByIP)
      .map(([ipAddress, actions]) => ({
        ipAddress,
        country: actions[0].country,
        actionCount: actions.length,
        actions: actions.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        latestAction: actions[0].createdAt
      }))
      .sort((a, b) =>
        new Date(b.latestAction).getTime() - new Date(a.latestAction).getTime()
      )

    // Paginate the grouped results
    const totalGroups = allGrouped.length
    const skip = (page - 1) * limit
    const paginatedGroups = allGrouped.slice(skip, skip + limit)

    return {
      actions: allActions, // Keep for compatibility
      actionsGrouped: paginatedGroups,
      totalCount: allActions.length,
      totalGroups,
      totalPages: Math.ceil(totalGroups / limit),
      currentPage: page
    }
  } catch (error) {
    console.error('Error fetching all user actions:', error)
    throw new Error('Failed to fetch user actions')
  }
}
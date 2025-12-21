import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get IP from various headers in order of preference
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  const remoteAddr = request.headers.get('remote-addr')
  
  let ip = 'unknown'
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    ip = forwarded.split(',')[0].trim()
  } else if (realIP) {
    ip = realIP.trim()
  } else if (cfConnectingIP) {
    ip = cfConnectingIP.trim()
  } else if (remoteAddr) {
    ip = remoteAddr.trim()
  }
  
  // Remove IPv6 prefix if present
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7)
  }
  
  // If still unknown, try to get from request.ip (Next.js)
  if (ip === 'unknown' && request.ip) {
    ip = request.ip
  }
  
  // For development, use a placeholder
  if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1') {
    ip = '192.168.1.100' // Development placeholder
  }
  
  return NextResponse.json({ ip })
}

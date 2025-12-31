/**
 * Get country from IP address using ip-api.com
 * Free tier: 45 requests per minute
 */
export async function getCountryFromIP(ipAddress?: string): Promise<string | null> {
  if (!ipAddress || ipAddress === 'unknown') {
    return null
  }

  // Skip local/development IPs
  if (
    ipAddress === '127.0.0.1' ||
    ipAddress === '::1' ||
    ipAddress.startsWith('192.168.') ||
    ipAddress.startsWith('10.') ||
    ipAddress.startsWith('172.')
  ) {
    return 'Cameroon'
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,countryCode`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.error('IP geolocation API error:', response.status)
      return null
    }

    const data = await response.json()

    if (data.status === 'success' && data.country) {
      return data.country
    }

    return null
  } catch (error) {
    console.error('Error fetching country from IP:', error)
    return null
  }
}

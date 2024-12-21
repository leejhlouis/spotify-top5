import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code') || ''
  const state = searchParams.get('state')

  if (!code || !state) {
    return NextResponse.redirect('/error')
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code
    })
  })
  const data = await response.json()

  if (data.error) {
    return NextResponse.redirect('/error')
  }

  const cookieStore = await cookies()
  const { access_token, expires_in } = data
  cookieStore.set('accessToken', access_token, {
    expires: new Date(Date.now() + expires_in * 1000)
  })

  return NextResponse.redirect(new URL('/', request.url))
}

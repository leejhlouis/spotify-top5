import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!
  const scopes = ['user-top-read'].join(' ')
  const state = Math.random().toString(36).substring(2, 15)

  const searchParams = new URLSearchParams()
  searchParams.append('client_id', clientId)
  searchParams.append('response_type', 'code')
  searchParams.append('redirect_uri', redirectUri)
  searchParams.append('scope', scopes)
  searchParams.append('state', state)

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${searchParams.toString()}`)
}

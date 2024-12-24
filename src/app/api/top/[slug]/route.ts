import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type ArtistItem = {
  name: string
  images: { url: string }[]
  external_urls: { spotify: string }
}

type TrackItem = {
  name: string
  artists: { name: string }[]
  album: { images: { url: string }[] }
  external_urls: { spotify: string }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
  const time_range = request.nextUrl.searchParams.get('time_range') || 'short_term'
  const type = (await params).slug
  if (type != 'artists' && type != 'tracks') {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  const searchParams = new URLSearchParams()
  searchParams.append('time_range', time_range)
  searchParams.append('limit', '5')
  searchParams.append('offset', '0')

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const data = await response.json()
  let items
  if (type === 'artists') {
    items = data.items.map(({ name, images, external_urls }: ArtistItem) => ({
      image: images[0].url,
      url: external_urls.spotify,
      name
    }))
  } else {
    items = data.items.map(({ name, artists, album, external_urls }: TrackItem) => ({
      image: album.images[0].url,
      artists: artists.map((artist: { name: string }) => artist.name),
      url: external_urls.spotify,
      name
    }))
  }

  return NextResponse.json({ items })
}

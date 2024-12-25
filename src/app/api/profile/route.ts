import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const { display_name } = await response.json()
  cookieStore.set('displayName', display_name, {
    expires: new Date(Date.now() +  3600000)
  });
  
  return NextResponse.json({
    displayName: display_name
  })
}

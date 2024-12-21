'use client'
import { useEffect } from 'react'
import Top5Container from '@/components/Top5Container'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Heading1 from '@/components/Heading1'
import { useUser, useUserDispatch } from '@/app/user-provider'
import { fetchProfile, fetchTopArtists, fetchTopTracks, setTop5Loading } from '@/lib/features/user/userActions'

export default function Home() {
  const userDispatch = useUserDispatch()

  const { authenticated, displayName, topArtists, topTracks, loading } = useUser()
  const { authLoading, top5Loading } = loading
  
  useEffect(() => {
    const init = async () => {
      if (authenticated) {
        setTop5Loading(userDispatch, true)
        await Promise.all([fetchProfile(userDispatch), fetchTopArtists(userDispatch), fetchTopTracks(userDispatch)])
        setTop5Loading(userDispatch, false)
      }
    }
    init()
  }, [authenticated])

  const router = useRouter()
  const handleLogin = () => {
    router.push('/api/auth/login')
  }

  return (
    <div>
      {top5Loading && <div>Loading...</div>}
      {authenticated && !top5Loading && (
        <>
          <Heading1>Hi, {displayName}!</Heading1>
          <div className='grid md:grid-cols-2 gap-8 md:gap-4'>
            {topArtists && (
              <Top5Container
                type='artists'
                items={topArtists}
              />
            )}
            {topTracks && (
              <Top5Container
                type='tracks'
                items={topTracks}
              />
            )}
          </div>
        </>
      )}
      {!authLoading && !authenticated && (
        <div className='h-[40vh] flex items-center'>
          <div>
            <Heading1 withMarginBottom={false}>Your Spotify Top 5</Heading1>
            <p>Discover your personalized monthly top 5 Spotify artists and tracks! Experience what Spotify Wrapped doesn&apos;t offer!</p>
            <Button
              className='bg-lime-500 text-black mt-6'
              onClick={handleLogin}
            >
              Continue with Spotify
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

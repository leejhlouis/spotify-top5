'use client'
import { useEffect, useState } from 'react'
import Top5Container from '@/components/Top5Container'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Heading1 from '@/components/Heading1'
import { useUser, useUserDispatch } from '@/app/user-provider'
import { fetchProfile, fetchTopArtists, fetchTopTracks, setInitLoading } from '@/lib/features/user/userActions'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

type TimeRange = {
  id: number
  label: string
  value: string
}
const TIME_RANGES: TimeRange[] = [
  { id: 1, label: 'Last 4 weeks', value: 'short_term' },
  { id: 2, label: 'Last 6 months', value: 'medium_term' },
  { id: 3, label: 'Last year', value: 'long_term' }
]

export default function Home() {
  const userDispatch = useUserDispatch()
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0])

  const { authenticated, displayName, topArtists, topTracks, loading } = useUser()
  const { authLoading, initLoading } = loading

  useEffect(() => {
    const loadAsync = async () => {
      if (authenticated) {
        const promises = [fetchTopArtists(userDispatch, selectedTimeRange.value), fetchTopTracks(userDispatch, selectedTimeRange.value)]
        if (!displayName) {
          setInitLoading(userDispatch, true)
          promises.push(fetchProfile(userDispatch))
        }
        await Promise.all(promises)
        setInitLoading(userDispatch, false)
      }
    }
    loadAsync()
  }, [selectedTimeRange, authenticated, userDispatch, displayName])

  const router = useRouter()
  const handleLogin = () => {
    router.push('/api/auth/login')
  }

  const NotLoggedInView = () => {
    return (
      <div className='h-[40vh] flex items-center'>
        <div>
          <Heading1 withMarginBottom={false}>Your Spotify Top 5</Heading1>
          <p className='mt-6'>Discover your personalized top 5 Spotify artists and tracks! Experience what Spotify Wrapped doesn&apos;t offer!</p>
          <Button
            className='bg-lime-500 text-black mt-8'
            onClick={handleLogin}
          >
            Continue with Spotify
          </Button>
        </div>
      </div>
    )
  }
  const LoggedInView = () => {
    return (
      <>
        <div className='flex items-center justify-between mb-6 lg:mb-12'>
          <Heading1 withMarginBottom={false}>Hi, {displayName}!</Heading1>
          <Combobox
            value={selectedTimeRange}
            onChange={value => value && setSelectedTimeRange(value)}
          >
            <div className='relative'>
              <ComboboxInput
                className='rounded-xl border-none bg-white/5 p-2 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                displayValue={(selectedTimeRange: TimeRange) => selectedTimeRange.label}
              />
              <ComboboxButton className='group absolute inset-y-0 right-0 px-1'>{/* <ChevronDownIcon className='size-4 fill-white/60 group-data-[hover]:fill-white' /> */}</ComboboxButton>
            </div>
            <ComboboxOptions
              anchor='bottom'
              transition
              className='mt-4 bg-white/10 backdrop-blur-sm rounded-lg'
            >
              {TIME_RANGES.map(timeRange => (
                <ComboboxOption
                  key={timeRange.id}
                  value={timeRange}
                  className='group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pl-3 pr-12 select-none data-[focus]:bg-white/10'
                >
                  <span className='text-sm'>{timeRange.label}</span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </div>
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
    )
  }

  return (
    <div>
      {initLoading && <div>Loading...</div>}
      {!authLoading && !authenticated && <NotLoggedInView />}
      {authenticated && !initLoading && <LoggedInView />}
    </div>
  )
}

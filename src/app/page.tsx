'use client'
import { useEffect, useState } from 'react'
import Top5Container from '@/components/Top5Container'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Heading1 from '@/components/Heading1'
import { useUser, useUserDispatch } from '@/app/user-provider'
import { fetchProfile, fetchTopArtists, fetchTopTracks, setLoading } from '@/lib/features/user/userActions'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon, SlashIcon } from '@heroicons/react/24/solid'

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

const LoadingView = () => {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!showLoading) return <></>
  return (
    <div className='flex justify-center items-center text-lime-500 h-[70vh]'>
      <SlashIcon className='animate-spin size-16' />
    </div>
  )
}

export default function Home() {
  const userDispatch = useUserDispatch()
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0])

  const { authenticated, displayName, topArtists, topTracks, loading } = useUser()
  const { authLoading, initLoading, top5Loading } = loading

  useEffect(() => {
    const loadAsync = async () => {
      if (authenticated) {
        const promises = [fetchTopArtists(userDispatch, selectedTimeRange.value), fetchTopTracks(userDispatch, selectedTimeRange.value)]
        setLoading(userDispatch, {
          top5Loading: true
        })
        if (!displayName) {
          setLoading(userDispatch, {
            initLoading: true
          })
          promises.push(fetchProfile(userDispatch))
        }
        await Promise.all(promises)
        setLoading(userDispatch, {
          initLoading: false,
          top5Loading: false
        })
      }
    }
    loadAsync()
  }, [selectedTimeRange, authenticated, userDispatch, displayName])

  const handleOnTimeRangeChange = (value: TimeRange) => {
    setSelectedTimeRange(value)
  }

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
        <div className='sm:flex items-center justify-between mb-6 lg:mb-12'>
          {!displayName && <div className='animate-pulse bg-slate-800 rounded-xl w-64 h-8 lg:h-10'></div>}
          {displayName && <Heading1 withMarginBottom={false}>Hi, {displayName}!</Heading1>}
          <Combobox
            value={selectedTimeRange}
            onChange={handleOnTimeRangeChange}
          >
            <div className='mt-4 sm:mt-0 relative'>
              <ComboboxInput
                className='w-44 rounded-xl border-none bg-white/5 px-4 py-2 text-white'
                displayValue={(selectedTimeRange: TimeRange) => selectedTimeRange.label}
                disabled
              />
              <ComboboxButton className='group absolute w-44 sm:w-full inset-y-0 left-0'>
                <ChevronDownIcon className='w-fit ml-auto mr-2 size-4 fill-white/60 group-data-[hover]:fill-white' />
              </ComboboxButton>
            </div>
            <ComboboxOptions
              anchor='bottom'
              transition
              className='mt-2 bg-slate-800/80 backdrop-blur-sm rounded-lg'
            >
              {TIME_RANGES.map(timeRange => (
                <ComboboxOption
                  key={timeRange.id}
                  value={timeRange}
                  className='flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none w-44 hover:bg-white/10'
                >
                  <span>{timeRange.label}</span>
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
              loading={initLoading || top5Loading}
            />
          )}
          {topTracks && (
            <Top5Container
              type='tracks'
              items={topTracks}
              loading={initLoading || top5Loading}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <>
      {authLoading && <LoadingView />}
      {!authLoading && !authenticated && <NotLoggedInView />}
      {!authLoading && authenticated && <LoggedInView />}
    </>
  )
}

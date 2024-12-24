import Image from 'next/image'
import Link from 'next/link'

type Top5Item = {
  name: string
  image: string
  artists: string[]
  url: string
}
type Top5ContainerProps = {
  type: 'artists' | 'tracks'
  items: Top5Item[]
  loading: boolean
}

const LoadingList = () => {
  return (
    <div className='flex items-center px-2 py-3 md:py-4 gap-4 md:gap-6 max-w-lg'>
      <div className='animate-pulse bg-slate-800 rounded-xl size-6 lg:size-10'></div>
      <div className='flex items-center gap-4'>
        <div className='animate-pulse bg-slate-800 rounded-xl size-24 lg:size-28' />
        <div>
          <div className='animate-pulse bg-slate-800 rounded-lg w-36 lg:w-48 h-4 mb-2'></div>
          <div className='animate-pulse bg-slate-800 rounded-lg w-24 lg:w-36 h-4'></div>
        </div>
      </div>
    </div>
  )
}

export default function Top5Container({ type, items, loading }: Top5ContainerProps) {
  return (
    <div>
      <h2 className='text-lg lg:text-2xl font-medium'>Your Top {type === 'artists' ? 'Artists' : 'Tracks'}</h2>
      {loading && (
        <>
          <LoadingList />
          <LoadingList />
          <LoadingList />
          <LoadingList />
          <LoadingList />
        </>
      )}
      {!loading && (
        <ul>
          {items.map(({ name, image, artists, url }, index: number) => (
            <li key={index}>
              <Link
                href={url}
                className='flex items-center gap-4 rounded-xl px-2 cursor-pointer text-white no-underline hover:text-lime-500 hover:no-underline md:gap-6 py-3 md:py-4'
              >
                <span className='w-1/12 text-2xl lg:text-4xl font-semibold tracking-tighter'>#{index + 1}</span>
                <div className='w-11/12 flex items-center'>
                  <Image
                    className='mr-4 size-24 lg:size-28'
                    src={image}
                    alt={name}
                    width={80}
                    height={80}
                  />
                  <div className='flex flex-col'>
                    <span className='font-bold'>{name}</span>
                    {artists && <span className='text-gray-300'>{artists.join(', ')}</span>}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

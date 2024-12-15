import Image from 'next/image'
import Link from 'next/link'

interface Top5ContainerProps {
  type: 'artists' | 'tracks'
  items: []
}

export default function Top5Container({ type, items }: Top5ContainerProps) {
  return (
    <div>
      <h2 className='text-lg lg:text-2xl font-medium'>Your Top {type === 'artists' ? 'Artists' : 'Tracks'}</h2>
      <ul>
        {items.map(({ name, image, artists, url }, index: number) => (
          <li
            key={index}
            className='flex items-center gap-4 rounded-xl px-2 cursor-pointer md:gap-6 py-3 md:py-4'
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
                <Link href={url} className='font-bold text-white hover:text-lime-500'>{name}</Link>
                {artists && <span className='text-gray-300'>{artists}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <div className='flex justify-center mt-4 py-4 border-t border-opacity-5 border-white'>
      <span className='text-gray-200'>
        Made by <Link href='https://github.com/leejhlouis'>leejhlouis</Link>
      </span>
    </div>
  )
}

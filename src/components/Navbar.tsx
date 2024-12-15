'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser, useUserDispatch } from '@/app/user-provider'
import Container from '@/components/Container'

type NavLink = {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: 'https://github.com/leejhlouis/spotify-top5', label: 'Contribute' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { authenticated } = useUser()
  const userDispatch = useUserDispatch()

  const handleLogout = async () => {
    await fetch('/api/auth/logout')
    userDispatch({
      type: 'authenticatedSet',
      value: false
    })
  }

  return (
    <nav className='border-b border-white border-opacity-5'>
      <Container>
        <div className='flex justify-end py-4'>
          <ul className='flex gap-2 sm:gap-4'>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  className={`text-white ${pathname === link.href ? 'font-bold' : ''}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {authenticated && (
              <a className='text-white' onClick={handleLogout}>Logout</a>
            )}
          </ul>
        </div>
      </Container>
    </nav>
  )
}

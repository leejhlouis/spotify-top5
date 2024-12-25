'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser, useUserDispatch } from '@/app/user-provider'
import Container from '@/components/Container'
import { handleLogOut } from '@/lib/features/user/userActions'

type NavLink = {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: 'https://github.com/leejhlouis/spotify-top5', label: 'Contribute' }
]

export default function Navbar() {
  const pathname = usePathname()
  const { authenticated } = useUser()
  const userDispatch = useUserDispatch()
  const logout = () => handleLogOut(userDispatch)

  return (
    <>
      <nav className='fixed top-0 w-full border-b border-white border-opacity-5 bg-slate-900/80 backdrop-blur-sm z-10'>
        <Container>
          <div className='flex justify-end items-center h-14'>
            <ul className='flex gap-2.5 sm:gap-4'>
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
                <a
                  className='text-white'
                  onClick={logout}
                >
                  Logout
                </a>
              )}
            </ul>
          </div>
        </Container>
      </nav>
      <div className='h-14'></div>
    </>
  )
}

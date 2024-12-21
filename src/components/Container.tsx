import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className='max-w-screen-sm md:max-w-screen-lg mx-auto px-4 xl:px-0'>{children}</div>
}

import { ReactNode, MouseEventHandler } from 'react'

type ButtonProps = {
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded-lg hover:opacity-90`}
    >
      {children}
    </button>
  )
}

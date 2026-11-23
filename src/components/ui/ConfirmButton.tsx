'use client'

import type { ReactNode } from 'react'

interface ConfirmButtonProps {
  message: string
  className?: string
  disabled?: boolean
  title?: string
  children: ReactNode
}

export function ConfirmButton({
  message,
  className,
  disabled,
  title,
  children,
}: ConfirmButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      title={title}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault()
      }}
    >
      {children}
    </button>
  )
}

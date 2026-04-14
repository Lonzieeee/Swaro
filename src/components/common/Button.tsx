import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export default function Button({ children, variant = 'primary', style, ...rest }: Props) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.65rem 1.25rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    borderRadius: '0.5rem',
    border: variant === 'ghost' ? '1px solid #e5e5e5' : 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    background: variant === 'primary' ? '#2563eb' : 'transparent',
    color: variant === 'primary' ? '#fff' : '#1a1a1a',
  }

  return (
    <button type="button" style={{ ...base, ...style }} {...rest}>
      {children}
    </button>
  )
}

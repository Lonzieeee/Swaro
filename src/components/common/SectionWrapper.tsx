import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  id?: string
  className?: string
  as?: 'section' | 'div'
}

export default function SectionWrapper({ children, id, className = '', as: Tag = 'section' }: Props) {
  return (
    <Tag id={id} className={className} style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.25rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>{children}</div>
    </Tag>
  )
}

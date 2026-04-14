import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export default function ServiceCard({ title, children }: Props) {
  return (
    <article
      style={{
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e5e5',
        background: '#fff',
        height: '100%',
      }}
    >
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.15rem' }}>{title}</h3>
      <div style={{ color: '#5c5c5c', fontSize: '0.95rem' }}>{children}</div>
    </article>
  )
}

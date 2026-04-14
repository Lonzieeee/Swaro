import type { CSSProperties, FormEvent } from 'react'
import { useState } from 'react'
import Button from '../common/Button'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: '1rem',
        maxWidth: '28rem',
        padding: '1.5rem',
        border: '1px solid #e5e5e5',
        borderRadius: '0.75rem',
        background: '#fff',
      }}
    >
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.9rem', fontWeight: 600 }}>
        Name
        <input required name="name" type="text" autoComplete="name" style={inputStyle} />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.9rem', fontWeight: 600 }}>
        Email
        <input required name="email" type="email" autoComplete="email" style={inputStyle} />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.9rem', fontWeight: 600 }}>
        Message
        <textarea required name="message" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
      </label>
      <Button type="submit">Send message</Button>
      {sent ? <p style={{ margin: 0, fontSize: '0.9rem', color: '#15803d' }}>Thanks — this demo only shows a confirmation.</p> : null}
    </form>
  )
}

const inputStyle: CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid #d4d4d4',
  font: 'inherit',
}

import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
  once?: boolean
}

export function useScrollAnimation(options: Options = {}) {
  const { rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = options
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return { ref, isVisible }
}

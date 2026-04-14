import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    /* Avoid browser restoring old scroll on route changes/back-forward. */
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const run = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    run()
    /* Extra passes handle late layout shifts (hero images/fonts) after route change. */
    const raf = requestAnimationFrame(run)
    const t = window.setTimeout(run, 60)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
    }
  }, [pathname, search, hash, key])

  return null
}

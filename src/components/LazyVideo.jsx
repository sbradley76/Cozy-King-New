import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function LazyVideo({ src, type = 'video/mp4', poster, className = '' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduceMotion || !ref.current) return
    if (!('IntersectionObserver' in window)) { setActive(true); return }
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    }, { rootMargin: '420px 0px', threshold: 0.01 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay={!reduceMotion && active}
      preload={active ? 'metadata' : 'none'}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      {active && !reduceMotion ? <source src={src} type={type}/> : null}
    </video>
  )
}

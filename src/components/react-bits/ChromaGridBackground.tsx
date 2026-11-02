// Anvil platform layer: ChromaGrid as a full-size background (see the usage note).
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import ChromaGrid from './ChromaGrid'

type Props = ComponentProps<typeof ChromaGrid> & { layerClassName?: string }

/**
 * Fills its nearest `relative` parent at any size. ChromaGrid's own root is
 * `relative h-full w-full`; positioned directly inside a section without a
 * fixed height it collapses to 0px, so always render it through this layer.
 * It also stops the effect while it is off screen and caps its pixel ratio.
 */
export default function ChromaGridBackground({ layerClassName = '', ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)), { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${layerClassName}`}>
      {onScreen && <ChromaGrid {...(props as ComponentProps<typeof ChromaGrid>)} />}
    </div>
  )
}

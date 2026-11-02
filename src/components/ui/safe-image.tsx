// Anvil essentials — an image that never shows a broken icon.
// <SafeImage src={url} alt="…" className="aspect-[4/3] w-full object-cover" />
// When the photo fails (a dead Unsplash link, offline), a quiet tinted panel
// in the site's own colours takes its place, keeping the layout and the alt
// text. Lazy by default; pass priority for the hero image (the largest paint).
import { useState, type ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** The hero image: load at once, high fetch priority. */
  priority?: boolean
  /** Shown in the fallback panel (defaults to the alt text). */
  fallbackLabel?: string
}

export function SafeImage({ src, alt, priority = false, fallbackLabel, className, onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-muted to-accent text-center text-sm text-muted-foreground',
          className,
        )}
      >
        <span className="max-w-[80%] px-4 leading-snug">{fallbackLabel ?? alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
      {...props}
    />
  )
}

export default SafeImage

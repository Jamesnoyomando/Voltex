// Anvil essentials — the light/dark switch for the navbar.
// <ThemeToggle /> (round icon button) or <ThemeToggle variant="switch" />
// (a small sliding switch). Uses the site's tokens, so it fits any palette;
// on a photo hero pass className="text-white" while the navbar is transparent.
import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useTheme } from '@/components/ui/theme-provider'

export function ThemeToggle({ variant = 'icon', className }: { variant?: 'icon' | 'switch'; className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const dark = resolvedTheme === 'dark'
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme'

  if (variant === 'switch') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label={label}
        onClick={toggleTheme}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 flex size-6 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform duration-200',
            dark && 'translate-x-5',
          )}
        >
          {dark ? <Moon className="size-3.5" aria-hidden /> : <Sun className="size-3.5" aria-hidden />}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={toggleTheme}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  )
}

export default ThemeToggle

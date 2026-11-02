// Anvil essentials — light/dark theme for the whole site.
// Wrap the app once: <ThemeProvider>{app}</ThemeProvider>. The choice is kept
// in localStorage ("theme") and applied as the .dark class on <html>, which
// the design tokens in src/index.css follow. useTheme() also works outside
// the provider (it follows the class), so library components can call it.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'theme'
const ThemeContext = createContext<ThemeState | null>(null)

const systemTheme = (): 'light' | 'dark' =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

function readStored(fallback: Theme, key = STORAGE_KEY): Theme {
  try {
    const value = localStorage.getItem(key)
    return value === 'light' || value === 'dark' || value === 'system' ? value : fallback
  } catch {
    return fallback
  }
}

function apply(resolved: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

/**
 * next-themes' props are accepted too (models write them from habit:
 * storageKey, attribute, enableSystem…); storageKey is honoured, the rest
 * are fixed here (class attribute, system theme supported).
 */
export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string | string[]
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  forcedTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light', storageKey = STORAGE_KEY, forcedTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => forcedTheme ?? readStored(defaultTheme, storageKey))
  const [system, setSystem] = useState<'light' | 'dark'>(systemTheme)
  const resolvedTheme = theme === 'system' ? system : theme

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    const onChange = () => setSystem(media?.matches ? 'dark' : 'light')
    media?.addEventListener('change', onChange)
    return () => media?.removeEventListener('change', onChange)
  }, [])

  useEffect(() => apply(resolvedTheme), [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // Private mode: the choice lasts for this visit only.
    }
  }, [storageKey])

  const value = useMemo<ThemeState>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark') }),
    [theme, resolvedTheme, setTheme],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/** The current theme; outside a ThemeProvider it follows (and sets) the .dark class. */
export function useTheme(): ThemeState {
  const context = useContext(ThemeContext)
  const [classTheme, setClassTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  useEffect(() => {
    if (context) return
    const observer = new MutationObserver(() => setClassTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light'))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [context])
  if (context) return context
  const setTheme = (next: Theme) => apply(next === 'system' ? systemTheme() : next)
  return { theme: classTheme, resolvedTheme: classTheme, setTheme, toggleTheme: () => setTheme(classTheme === 'dark' ? 'light' : 'dark') }
}

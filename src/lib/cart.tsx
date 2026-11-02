import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

export interface CartLine {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

interface CartValue {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const STORAGE_KEY = 'voltix.cart.v1'

const CartContext = createContext<CartValue | null>(null)

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((line): line is CartLine => {
      if (typeof line !== 'object' || line === null) return false
      const l = line as Record<string, unknown>
      return (
        typeof l.id === 'string' &&
        typeof l.name === 'string' &&
        typeof l.price === 'number' &&
        typeof l.image === 'string' &&
        typeof l.qty === 'number'
      )
    })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readStored())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage may be unavailable */
    }
  }, [lines])

  const add = useCallback((line: Omit<CartLine, 'qty'>, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id)
      if (existing) {
        return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { ...line, qty }]
    })
    setIsOpen(true)
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0)
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0)
    return {
      lines,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    }
  }, [lines, isOpen, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES } from '@/data/products'
import type { Category } from '@/data/products'
import { listProducts } from '@/lib/store-api'
import type { Product } from '@/data/products'
import { cn } from '@/lib/utils'

type PriceBand = 'all' | 'low' | 'mid' | 'high'
type SortKey = 'featured' | 'price-low' | 'price-high' | 'name'

const PRICE_BANDS: { id: PriceBand; label: string }[] = [
  { id: 'all', label: 'Any price' },
  { id: 'low', label: 'Under K5,000' },
  { id: 'mid', label: 'K5,000 to K15,000' },
  { id: 'high', label: 'Above K15,000' },
]

export function Shop() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [band, setBand] = useState<PriceBand>('all')
  const [sort, setSort] = useState<SortKey>('featured')

  const category = (params.get('category') ?? 'all') as Category | 'all'

  useEffect(() => {
    let active = true
    void listProducts().then((items) => {
      if (active) setProducts(items)
    })
    return () => {
      active = false
    }
  }, [])

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    const filtered = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (term && !`${p.name} ${p.tagline} ${p.colour}`.toLowerCase().includes(term)) return false
      if (band === 'low' && p.price >= 5000) return false
      if (band === 'mid' && (p.price < 5000 || p.price > 15000)) return false
      if (band === 'high' && p.price <= 15000) return false
      return true
    })
    const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
      featured: () => 0,
      'price-low': (a, b) => a.price - b.price,
      'price-high': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
    }
    return [...filtered].sort(sorters[sort])
  }, [products, category, band, sort, query])

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-foreground">
        Everything on the shelf
      </h1>
      <p className="mt-2 max-w-xl text-base text-muted-foreground">
        {visible.length} devices in stock and ready to ship from Cairo Road, Lusaka.
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-muted/60 p-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, colour or spec"
            aria-label="Search devices"
            className="w-full rounded-xl border border-input bg-card py-2.5 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <SlidersHorizontal className="size-4" /> Filter
          </span>
          <select
            value={band}
            onChange={(e) => setBand(e.target.value as PriceBand)}
            aria-label="Price band"
            className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {PRICE_BANDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort devices"
            className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <option value="featured">Sort: featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name A to Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              const next = new URLSearchParams(params)
              if (c.id === 'all') next.delete('category')
              else next.set('category', c.id)
              setParams(next)
            }}
            className={cn(
              'shrink-0 rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              category === c.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-muted',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center">
          <p className="font-display text-lg font-bold text-foreground">Nothing matches that yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another colour, a wider price band, or message us and we will look for the model.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setBand('all')
              setParams({})
            }}
            className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

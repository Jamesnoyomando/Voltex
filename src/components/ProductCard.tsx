import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { useCart } from '@/lib/cart'
import { categoryLabel, formatKwacha } from '@/data/products'
import type { Product } from '@/data/products'
import { cn } from '@/lib/utils'

export function ProductCard({
  product,
  size = 'default',
  className,
}: {
  product: Product
  size?: 'default' | 'feature'
  className?: string
}) {
  const { add } = useCart()
  const discounted = typeof product.oldPrice === 'number' && product.oldPrice > product.price

  return (
    <article
      className={cn(
        'group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-muted/70 p-3 transition-colors duration-300 hover:border-foreground/25',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
            {categoryLabel(product.category)}
          </p>
          <h3 className="truncate font-display text-sm font-semibold text-foreground">
            {product.name}
          </h3>
        </div>
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <Link
        to={`/product/${product.slug}`}
        className="relative mt-2 block overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <SafeImage
          src={product.image}
          alt={product.alt}
          className={cn(
            'w-full rounded-2xl bg-muted object-cover object-center shadow-card transition-transform duration-500 group-hover:scale-[1.03]',
            size === 'feature' ? 'aspect-[16/11]' : 'aspect-square',
          )}
        />
      </Link>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-card px-2.5 py-1 font-display text-sm font-bold text-foreground ring-1 ring-border">
            {formatKwacha(product.price)}
          </span>
          {discounted && (
            <span className="text-xs font-medium text-muted-foreground line-through">
              {formatKwacha(product.oldPrice ?? 0)}
            </span>
          )}
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold',
              product.inStock
                ? 'border-primary/30 bg-accent text-accent-foreground'
                : 'border-border bg-card text-muted-foreground',
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                product.inStock ? 'bg-accent-foreground' : 'bg-muted-foreground',
              )}
            />
            {product.inStock ? 'Available' : 'Out of stock'}
          </span>
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() =>
            add({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          className={cn(
            'mt-2.5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
            product.inStock
              ? 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:opacity-95'
              : 'cursor-not-allowed bg-card text-muted-foreground ring-1 ring-border',
          )}
        >
          {product.inStock ? 'Buy' : 'Notify me'}
        </button>
      </div>
    </article>
  )
}

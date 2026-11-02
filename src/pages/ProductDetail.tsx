import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { useCart } from '@/lib/cart'
import { categoryLabel, formatKwacha } from '@/data/products'
import type { Product } from '@/data/products'
import { getProduct } from '@/lib/store-api'

export function ProductDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    void getProduct(slug).then((found) => {
      if (!active) return
      setProduct(found)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="h-72 animate-pulse rounded-3xl bg-muted" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">We cannot find that device</h1>
        <p className="mt-2 text-base text-muted-foreground">
          It may have sold out and been taken off the shelf.
        </p>
        <Link
          to="/shop"
          className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to the shop
        </Link>
      </div>
    )
  }

  const discounted = typeof product.oldPrice === 'number' && product.oldPrice > product.price

  const buyNow = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    navigate('/checkout')
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to all devices
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted p-3">
            <SafeImage
              src={product.image}
              alt={product.alt}
              priority
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl border border-border bg-card p-3">
              <ShieldCheck className="mx-auto size-4 text-primary" />
              <p className="mt-1 text-xs font-medium text-foreground">12-month warranty</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-3">
              <Truck className="mx-auto size-4 text-primary" />
              <p className="mt-1 text-xs font-medium text-foreground">Free Lusaka delivery</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-3">
              <PackageCheck className="mx-auto size-4 text-primary" />
              <p className="mt-1 text-xs font-medium text-foreground">Tested in shop</p>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {categoryLabel(product.category)} · {product.colour}
          </p>
          <h1 className="mt-1 font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-tight font-bold text-foreground">
            {product.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">{product.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-card px-3 py-1.5 font-display text-xl font-bold text-foreground ring-1 ring-border">
              {formatKwacha(product.price)}
            </span>
            {discounted && (
              <span className="text-sm text-muted-foreground line-through">
                {formatKwacha(product.oldPrice ?? 0)}
              </span>
            )}
            <span
              className={
                product.inStock
                  ? 'inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-semibold text-primary'
                  : 'inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border'
              }
            >
              <span
                className={`size-1.5 rounded-full ${product.inStock ? 'bg-primary' : 'bg-muted-foreground'}`}
              />
              {product.inStock ? 'Available now' : 'Out of stock'}
            </span>
          </div>

          <p className="mt-4 max-w-[60ch] text-base text-foreground/85">{product.description}</p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
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
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {product.inStock ? 'Add to bag' : 'Out of stock'}
            </button>
            {product.inStock && (
              <button
                type="button"
                onClick={buyNow}
                className="flex-1 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Buy now
              </button>
            )}
          </div>

          <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="text-right text-sm font-medium text-foreground">{spec.value}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-4 py-2.5">
              <dt className="text-sm text-muted-foreground">Payment</dt>
              <dd className="text-right text-sm font-medium text-foreground">
                Airtel, MTN, Zamtel or bank
              </dd>
            </div>
          </dl>

          <p className="mt-4 inline-flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            Bring your own storage or SIM, and we will set it up in the shop for free.
          </p>
        </div>
      </div>
    </div>
  )
}

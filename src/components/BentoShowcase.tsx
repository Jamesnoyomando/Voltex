import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { ProductCard } from '@/components/ProductCard'
import { formatKwacha } from '@/data/products'
import type { Product } from '@/data/products'

const REVIEWS = [
  {
    name: 'Chanda M.',
    place: 'Kabulonga, Lusaka',
    quote: 'Paid with MTN money at 9pm. The laptop was at my gate before lunch.',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    name: 'Nakato S.',
    place: 'Ndola',
    quote: 'They tested the phone on a call with me before payment. No surprises.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    name: 'Bwalya K.',
    place: 'Kitwe',
    quote: 'Receipt email arrived in a minute, with the serial number on it.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  },
]

function Tile({
  children,
  className = '',
  tone = 'muted',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'muted' | 'primary' | 'secondary' | 'card'
}) {
  const tones = {
    muted: 'bg-muted/70 border-border',
    primary: 'bg-primary border-primary',
    secondary: 'bg-secondary border-secondary',
    card: 'bg-card border-border',
  }
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-3xl border ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  )
}

export function BentoShowcase({ products }: { products: Product[] }) {
  const byId = (id: string) => products.find((p) => p.id === id)
  const feature = byId('p-aero-14') ?? products[0]
  const phone = byId('p-nova-12') ?? products[1]
  const audio = byId('p-halo-over') ?? products[2]
  const tablet = byId('p-slate-11') ?? products[3]
  const buds = byId('p-air-buds') ?? products[4]

  return (
    <section id="devices" className="px-5 py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-foreground">
              On the shelf this week
            </h2>
            <p className="mt-2 max-w-md text-base text-muted-foreground">
              Every device is opened, charged and tested before it is listed here.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Browse the shop
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {feature && (
            <div className="col-span-2 lg:row-span-2">
              <ProductCard product={feature} size="feature" className="h-full" />
            </div>
          )}

          {phone && (
            <div className="col-span-1">
              <ProductCard product={phone} className="h-full" />
            </div>
          )}

          <Tile tone="primary" className="col-span-1 flex flex-col justify-between p-4">
            <p className="font-display text-base leading-snug font-bold text-primary-foreground">
              Trade in your old phone and pay the difference.
            </p>
            <div>
              <p className="mt-4 text-sm text-primary-foreground/85">
                Bring it to our shop or send photos on WhatsApp.
              </p>
              <Link
                to="/support"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-primary-foreground px-3 py-2 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
              >
                Get a valuation
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Tile>

          {audio && (
            <div className="col-span-1">
              <ProductCard product={audio} className="h-full" />
            </div>
          )}

          <Tile tone="secondary" className="col-span-1 flex flex-col justify-between p-4">
            <div>
              <p className="font-display text-base font-bold text-secondary-foreground">
                Three finishes
              </p>
              <p className="mt-1 text-sm text-secondary-foreground/80">
                Silver, graphite and cream in most models.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="size-7 rounded-full bg-card ring-1 ring-border" />
              <span className="size-7 rounded-full bg-foreground" />
              <span className="size-7 rounded-full bg-support" />
              <span className="size-7 rounded-full bg-accent ring-1 ring-border" />
            </div>
          </Tile>

          {tablet && (
            <div className="col-span-2 lg:col-span-1">
              <ProductCard product={tablet} className="h-full" />
            </div>
          )}

          {buds && (
            <div className="col-span-2 lg:col-span-2">
              <div className="flex h-full min-w-0 flex-col gap-3 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                <SafeImage
                  src={buds.image}
                  alt={buds.alt}
                  className="h-32 w-full shrink-0 rounded-2xl object-cover sm:size-28"
                />
                <div className="min-w-0">
                  <p className="font-display text-base font-bold text-foreground">
                    Same-day delivery in Lusaka
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Order before 15:00 and a rider brings it to you. Elsewhere in Zambia, 24 to 48
                    hours.
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Check className="size-4 text-primary" /> Air Buds Pro from{' '}
                    {formatKwacha(buds.price)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Tile tone="card" className="col-span-2 flex flex-col justify-between p-4">
            <div className="flex items-center gap-2">
              {REVIEWS.map((r) => (
                <SafeImage
                  key={r.name}
                  src={r.avatar}
                  alt={`${r.name} portrait`}
                  className="size-9 rounded-full object-cover ring-2 ring-card"
                />
              ))}
              <span className="text-sm font-medium text-muted-foreground">
                Customers who bought this month
              </span>
            </div>
            <p className="mt-3 font-display text-base leading-snug font-semibold text-foreground">
              "They tested the phone on a call with me before payment. No surprises."
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Nakato S. — Ndola</p>
          </Tile>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, ChevronDown, PlayCircle, ShieldCheck, Truck } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { Hero } from '@/components/Hero'
import { BentoShowcase } from '@/components/BentoShowcase'
import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES } from '@/data/products'
import type { Category } from '@/data/products'
import { listProducts } from '@/lib/store-api'
import type { Product } from '@/data/products'

const CHIPS: { id: Category | 'all'; label: string }[] = CATEGORIES

const CAMPAIGN_IMAGE =
  'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80'

const TUTORIAL_POSTER =
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80'

/** Drop your own clip into public/media/how-to-order.mp4 and it plays here. */
const TUTORIAL_VIDEO = '/media/how-to-order.mp4'

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    let active = true
    void listProducts().then((items) => {
      if (active) setProducts(items)
    })
    return () => {
      active = false
    }
  }, [])

  const phones = products.filter((p) => p.category === 'phones').slice(0, 4)

  return (
    <>
      <Hero />

      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CHIPS.map((chip) => (
            <Link
              key={chip.id}
              to={chip.id === 'all' ? '/shop' : `/shop?category=${chip.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {chip.label}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </Link>
          ))}
          <Link
            to="/shop"
            className="ml-auto hidden shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Shop all devices
          </Link>
        </div>
      </div>

      <BentoShowcase products={products} />

      <section className="px-5 pb-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-foreground">
              Phones people ask for
            </h2>
            <Link
              to="/shop?category=phones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              All phones
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {phones.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14">
        <div className="relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-border">
          <SafeImage
            src={CAMPAIGN_IMAGE}
            alt="Person using a laptop outdoors in the city at golden hour"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
          <div className="relative z-10 max-w-lg p-6 sm:p-10">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-white">
              Work from anywhere, without the cable
            </h2>
            <p className="mt-3 text-base text-white/85">
              Long-life batteries and data bundles set up in the shop, before you leave.
            </p>
            <Link
              to="/shop?category=laptops"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Shop laptops
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="how-to-order" className="scroll-mt-36 px-5 pb-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-muted">
            {videoReady ? (
              <video
                src={TUTORIAL_VIDEO}
                poster={TUTORIAL_POSTER}
                controls
                playsInline
                preload="none"
                className="aspect-video w-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setVideoReady(true)}
                className="group relative block w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label="Play the how to order video"
              >
                <SafeImage
                  src={TUTORIAL_POSTER}
                  alt="Customer paying for a phone at a shop counter with a card machine"
                  className="aspect-video w-full object-cover"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/35">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-background/95 px-4 py-2.5 text-sm font-semibold text-foreground">
                    <PlayCircle className="size-5 text-primary" />
                    Watch: ordering in 60 seconds
                  </span>
                </span>
              </button>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-foreground">
              Pay from your phone in three taps
            </h2>
            <ol className="mt-5 space-y-4">
              <li>
                <p className="font-display text-sm font-bold text-foreground">1. Add the device</p>
                <p className="text-sm text-muted-foreground">
                  Pick a model and press Buy. Your bag is kept on this device.
                </p>
              </li>
              <li>
                <p className="font-display text-sm font-bold text-foreground">2. Choose money or bank</p>
                <p className="text-sm text-muted-foreground">
                  Airtel, MTN or Zamtel number, or transfer to our Zanaco account.
                </p>
              </li>
              <li>
                <p className="font-display text-sm font-bold text-foreground">3. Approve the prompt</p>
                <p className="text-sm text-muted-foreground">
                  Confirm the PIN on your handset. A receipt email follows either way.
                </p>
              </li>
            </ol>
            <Link
              to="/support"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Need help ordering?
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 px-5 py-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          <div className="flex gap-3">
            <ShieldCheck className="size-5 shrink-0 text-primary" />
            <div>
              <p className="font-display text-sm font-bold text-foreground">12-month warranty</p>
              <p className="text-sm text-secondary-foreground/80">
                Repairs handled in Lusaka, not sent abroad.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Truck className="size-5 shrink-0 text-primary" />
            <div>
              <p className="font-display text-sm font-bold text-foreground">Tested before shipping</p>
              <p className="text-sm text-secondary-foreground/80">
                Battery, ports and calls checked on every unit.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <BadgeCheck className="size-5 shrink-0 text-primary" />
            <div>
              <p className="font-display text-sm font-bold text-foreground">Email receipt</p>
              <p className="text-sm text-secondary-foreground/80">
                Payment status lands in your inbox with the serial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

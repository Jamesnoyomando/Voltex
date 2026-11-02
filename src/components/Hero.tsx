import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { BrandStrip } from '@/components/BrandStrip'

const TAGLINE = 'This is your trusted one-stop online shop'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'

function Typewriter() {
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const complete = length === TAGLINE.length
    const delay = deleting ? 24 : complete ? 3200 : 48

    const timer = window.setTimeout(() => {
      if (!deleting && !complete) {
        setLength((n) => n + 1)
      } else if (!deleting && complete) {
        setDeleting(true)
      } else if (length > 0) {
        setLength((n) => n - 1)
      } else {
        setDeleting(false)
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [length, deleting])

  return (
    <p className="min-h-[3.5rem] font-display text-lg leading-snug font-medium text-foreground sm:min-h-[2rem] sm:text-xl">
      <span className="sr-only">{TAGLINE}</span>
      <span aria-hidden="true">{TAGLINE.slice(0, length)}</span>
      <span aria-hidden="true" className="caret-blink" />
    </p>
  )
}

export function Hero() {
  return (
    <section className="relative px-5 pt-5 pb-4 sm:pt-7">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/60 blur-3xl"
          />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:p-12">
            <div className="min-w-0">
              <h1 className="font-display text-[clamp(2.5rem,5.4vw,4rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground">
                Innovative devices, designed <span className="text-primary">for you</span>
              </h1>

              <div className="mt-4">
                <Typewriter />
              </div>

              <p className="mt-3 max-w-md text-base text-foreground/80">
                Laptops, phones and audio from brands you know, tested in our Lusaka workshop before
                they leave the shelf.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  Shop now
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <span className="text-sm text-foreground/70">Free delivery in Lusaka</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/75">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" /> 12-month warranty
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="size-4 text-primary" /> Ships in 24 hours
                </span>
              </div>
            </div>

            <div className="relative min-w-0">
              <div
                aria-hidden
                className="absolute top-4 right-2 size-16 rounded-full bg-support/70 shadow-card sm:size-20"
              />
              <div
                aria-hidden
                className="absolute bottom-2 left-0 size-8 rounded-full bg-primary/25 sm:size-10"
              />
              <SafeImage
                src={HERO_IMAGE}
                alt="Silver laptop open on a wooden desk showing a dark screen"
                priority
                className="relative z-10 aspect-[4/3] w-full rotate-[-3deg] rounded-2xl object-cover shadow-card transition-transform duration-500 hover:rotate-0"
              />
            </div>
          </div>
        </div>
        <BrandStrip />
      </div>
    </section>
  )
}

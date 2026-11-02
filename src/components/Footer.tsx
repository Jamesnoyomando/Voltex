import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const shopLinks = [
  { label: 'Laptops', to: '/shop?category=laptops' },
  { label: 'Phones', to: '/shop?category=phones' },
  { label: 'Tablets', to: '/shop?category=tablets' },
  { label: 'Audio', to: '/shop?category=audio' },
  { label: 'Accessories', to: '/shop?category=accessories' },
]

const helpLinks = [
  { label: 'How to order', to: '/#how-to-order' },
  { label: 'Delivery and warranty', to: '/support' },
  { label: 'Track an order', to: '/support' },
  { label: 'Talk to us', to: '/support' },
]

const companyLinks = [
  { label: 'About Voltix', to: '/support' },
  { label: 'Our shop in Lusaka', to: '/support' },
  { label: 'Sell your device', to: '/support' },
]

function Social({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#social"
      aria-label={label}
      className="grid size-9 place-items-center rounded-lg border border-border bg-background/60 text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift-a absolute -top-32 -left-24 size-[28rem] rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" />
        <div className="drift-b absolute -right-32 top-0 size-[26rem] rounded-full bg-accent/70 blur-3xl" />
        <div className="drift-c absolute -bottom-40 left-1/3 size-[28rem] rounded-full bg-support/30 blur-3xl dark:bg-primary/20" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="rounded-3xl border border-border bg-background/80 p-5 backdrop-blur-sm sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr]">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
                    <path d="M13.5 2 4 14h6l-1.5 8L20 9h-6.5L13.5 2Z" />
                  </svg>
                </span>
                <span className="font-display text-lg font-bold">Voltix</span>
              </div>
              <p className="mt-3 max-w-sm text-base text-muted-foreground">
                Genuine laptops, phones and audio, tested in Lusaka and delivered across Zambia.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!email.includes('@')) return
                  setSent(true)
                  setEmail('')
                }}
                className="mt-5"
              >
                <label htmlFor="newsletter" className="text-sm font-semibold text-foreground">
                  New stock, once a week
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="min-w-0 flex-1 rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Subscribe
                    <ArrowRight className="size-4" />
                  </button>
                </div>
                {sent && (
                  <p className="mt-2 text-sm text-foreground">You are on the list. Opt out any time.</p>
                )}
              </form>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Shop</p>
                <ul className="mt-3 space-y-2">
                  {shopLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Help</p>
                <ul className="mt-3 space-y-2">
                  {helpLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Company</p>
                <ul className="mt-3 space-y-2">
                  {companyLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Pay the way you already pay</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Airtel Money, MTN MoMo, Zamtel Kwacha or a bank transfer to Zanaco.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Delivery</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Free in Lusaka, K120 to Ndola, Kitwe and Livingstone. 12-month warranty included.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Voltix Devices. Plot 12, Cairo Road, Lusaka.
            </p>
            <div className="flex items-center gap-2">
              <Social
                label="WhatsApp"
                path="M12 2a10 10 0 0 0-8.7 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.2-1.2l-.4-.2-2.5.7.7-2.4-.3-.4A8 8 0 0 1 12 4Zm-3 4c-.3 0-.6.1-.9.4-.3.3-.7.8-.7 1.6 0 .9.6 1.8.7 1.9.1.2 1.3 2.1 3.1 2.9 1.5.6 1.8.5 2.1.5.3 0 1-.4 1.2-.9.1-.4.1-.8.1-.9l-.4-.2-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.7c-.1.1-.3.2-.5.1a5.2 5.2 0 0 1-1.5-1 5.6 5.6 0 0 1-1-1.4c-.1-.2 0-.3.1-.4l.4-.5c.1-.2.1-.3 0-.5l-.6-1.4c-.1-.3-.2-.3-.4-.3Z"
              />
              <Social
                label="Facebook"
                path="M14 9V7c0-.8.2-1.2 1.3-1.2H17V3h-2.4C11.9 3 11 4.6 11 6.7V9H9v3h2v9h3v-9h2.2l.3-3H14Z"
              />
              <Social
                label="Instagram"
                path="M12 2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5-.7.3-1.2.6-1.8 1.2-.6.6-.9 1.1-1.2 1.8-.3.6-.4 1.4-.5 2.4C2 9 2 9.3 2 12s0 3 .1 4.1c0 1 .2 1.8.5 2.4.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.6.3 1.4.4 2.4.5C9 22 9.3 22 12 22s3 0 4.1-.1c1 0 1.8-.2 2.4-.5.7-.3 1.2-.6 1.8-1.2.6-.6.9-1.1 1.2-1.8.3-.6.4-1.4.5-2.4 0-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1-.2-1.8-.5-2.4a4.9 4.9 0 0 0-1.2-1.8 4.9 4.9 0 0 0-1.8-1.2c-.6-.3-1.4-.4-2.4-.5C15 2 14.7 2 12 2Zm0 1.8c2.7 0 2.9 0 4 .1.8 0 1.3.2 1.6.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.6.1 1.1.1 1.3.1 4s0 2.9-.1 4c0 .8-.2 1.3-.3 1.6-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.6.3-1.1.1-1.3.1-4 .1s-2.9 0-4-.1c-.8 0-1.3-.2-1.6-.3-.4-.2-.7-.4-1-.7a2.7 2.7 0 0 1-.7-1c-.1-.3-.3-.8-.3-1.6-.1-1.1-.1-1.3-.1-4s0-2.9.1-4c0-.8.2-1.3.3-1.6.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.6-.3 1.1-.1 1.3-.1 4-.1Zm0 3.1a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 1.8a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Zm5.3-3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

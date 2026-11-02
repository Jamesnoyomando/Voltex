import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Lusaka orders placed before 15:00 arrive the same day by rider. Ndola, Kitwe, Kabwe and Livingstone take 24 to 48 hours by courier.',
  },
  {
    q: 'Can I pay half now and half on delivery?',
    a: 'For orders above K10,000 we take a 50% deposit by mobile money and the balance on delivery in Lusaka. Message us before paying.',
  },
  {
    q: 'What does the warranty cover?',
    a: 'Twelve months on the battery, screen and charging port, excluding accidental damage and water. Repairs are done in Lusaka.',
  },
  {
    q: 'My payment failed. Was I charged?',
    a: 'A failed prompt is not charged. If the money left your wallet, send us the transaction ID and we refund within one working day.',
  },
  {
    q: 'Can I see the device before paying?',
    a: 'Yes. Visit us at Plot 12, Cairo Road, Monday to Saturday. Every unit is opened and tested in front of you.',
  },
]

export function Support() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <h1 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-bold text-foreground">
        Talk to a person, not a bot
      </h1>
      <p className="mt-2 max-w-xl text-base text-muted-foreground">
        We answer on WhatsApp from 08:00 to 18:00, Monday to Saturday. Orders and repairs, same
        desk.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <Phone className="size-5 text-primary" />
          <p className="mt-2 text-sm font-semibold text-foreground">Call or WhatsApp</p>
          <p className="text-sm text-foreground">+260 97 123 4567</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <Mail className="size-5 text-primary" />
          <p className="mt-2 text-sm font-semibold text-foreground">Email</p>
          <p className="text-sm text-foreground">hello@voltix.zm</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <MapPin className="size-5 text-primary" />
          <p className="mt-2 text-sm font-semibold text-foreground">Shop</p>
          <p className="text-sm text-foreground">Plot 12, Cairo Road, Lusaka</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <Clock className="size-5 text-primary" />
          <p className="mt-2 text-sm font-semibold text-foreground">Hours</p>
          <p className="text-sm text-foreground">Mon to Sat, 08:00 to 18:00</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold text-foreground">
            Questions we get every week
          </h2>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((item, index) => (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(open === index ? null : index)}
                  aria-expanded={open === index}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.q}
                  <span className="shrink-0 text-primary">{open === index ? '−' : '+'}</span>
                </button>
                {open === index && (
                  <p className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-border bg-muted p-5">
          <MessageCircle className="size-5 text-primary" />
          <h2 className="mt-2 font-display text-lg font-bold text-foreground">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us the model you want and your town. We reply on the same number.
          </p>
          <form
            className="mt-4 space-y-2"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              form.reset()
              setOpen(-1)
            }}
          >
            <input
              required
              aria-label="Your name"
              placeholder="Your name"
              className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
            <input
              required
              type="email"
              aria-label="Your email"
              placeholder="name@company.com"
              className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
            <textarea
              required
              aria-label="Your message"
              rows={3}
              placeholder="I need a 14-inch laptop under K20,000 for accounting work"
              className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Send message
            </button>
            {open === -1 && (
              <p className="text-sm text-foreground">Message saved. We reply within a few hours.</p>
            )}
          </form>
          <Link
            to="/shop"
            className="mt-4 inline-block text-sm font-semibold text-foreground underline decoration-border underline-offset-4"
          >
            Back to the shop
          </Link>
        </div>
      </div>
    </div>
  )
}

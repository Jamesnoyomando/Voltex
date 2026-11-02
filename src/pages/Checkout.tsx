import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Check, Info, Smartphone } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatKwacha } from '@/data/products'
import {
  createOrder,
  normalisePhone,
  operatorForPhone,
  payOrder,
} from '@/lib/store-api'
import type { Operator, PaymentMethod } from '@/lib/store-api'
import { cn } from '@/lib/utils'

const OPERATORS: { id: Operator; label: string; hint: string }[] = [
  { id: 'airtel', label: 'Airtel Money', hint: '097, 077, 057' },
  { id: 'mtn', label: 'MTN MoMo', hint: '096, 076' },
  { id: 'zamtel', label: 'Zamtel Kwacha', hint: '095, 075' },
]

const BANKS = [
  { name: 'Zanaco', account: '0123 4567 8901 2', branch: 'Cairo Road' },
  { name: 'Absa', account: '0200 4411 8877 3', branch: 'Longacres' },
]

export function Checkout() {
  const { lines, subtotal, count, clear, closeCart } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Lusaka')
  const [address, setAddress] = useState('')
  const [method, setMethod] = useState<PaymentMethod>('airtel')
  const [simulateFailure, setSimulateFailure] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stage, setStage] = useState<'form' | 'sending' | 'approving'>('form')

  const isMobileMoney = method !== 'bank'
  const detected = operatorForPhone(phone)
  const delivery = subtotal > 15000 ? 0 : 120
  const total = subtotal + delivery

  const validate = () => {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = 'Enter the name on the order'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'We send the receipt to this address'
    if (isMobileMoney) {
      const digits = normalisePhone(phone)
      if (digits.length !== 10) next.phone = 'Use a 10-digit number, e.g. 0971234567'
      else if (!detected) next.phone = 'Use an Airtel, MTN or Zamtel number'
    }
    if (address.trim().length < 6) next.address = 'Add a street, plot number or landmark'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async () => {
    closeCart()
    if (!validate()) return
    setStage('sending')
    const order = await createOrder({
      customer: { name, email, phone: isMobileMoney ? normalisePhone(phone) : '', city, address },
      items: lines.map((l) => ({ id: l.id, name: l.name, price: l.price, qty: l.qty })),
      amount: total,
      method,
    })
    setStage('approving')
    await payOrder(order.reference, { fail: simulateFailure })
    clear()
    navigate(`/order/${order.reference}`)
  }

  if (count === 0 && stage === 'form') {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Your bag is empty</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Add a laptop, phone or pair of headphones and the checkout will open here.
        </p>
        <Link
          to="/shop"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Browse devices <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  const busy = stage !== 'form'

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <h1 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-bold text-foreground">
        Checkout
      </h1>
      <p className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-sm font-medium text-accent-foreground">
        <Info className="size-4" /> Demo mode: no money is charged and no real prompt is sent.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="min-w-0 space-y-4">
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display text-base font-bold text-foreground">1. Who is it for</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mubanga Chileshe"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email for the receipt
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display text-base font-bold text-foreground">2. Where it goes</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="text-sm font-medium text-foreground">
                  Town or city
                </label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {['Lusaka', 'Ndola', 'Kitwe', 'Livingstone', 'Kabwe', 'Chipata'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="address" className="text-sm font-medium text-foreground">
                  Street, plot or landmark
                </label>
                <input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot 24, Kabulonga Road"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display text-base font-bold text-foreground">3. How you pay</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {OPERATORS.map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => setMethod(op.id)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                    method === op.id
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-background text-foreground hover:bg-muted',
                  )}
                >
                  <Smartphone className="size-4" />
                  <span className="mt-1 block text-sm font-semibold">{op.label}</span>
                  <span className="block text-xs text-muted-foreground">{op.hint}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setMethod('bank')}
                className={cn(
                  'rounded-xl border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  method === 'bank'
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted',
                )}
              >
                <Building2 className="size-4" />
                <span className="mt-1 block text-sm font-semibold">Bank transfer</span>
                <span className="block text-xs text-muted-foreground">Zanaco, Absa</span>
              </button>
            </div>

            {isMobileMoney ? (
              <div className="mt-3">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Mobile money number
                </label>
                <input
                  id="phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0971234567"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {detected
                    ? `Detected ${OPERATORS.find((o) => o.id === detected)?.label}. You will approve a prompt on this handset.`
                    : 'Airtel 097/077/057, MTN 096/076, Zamtel 095/075.'}
                </p>
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {BANKS.map((b) => (
                  <div
                    key={b.name}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{b.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Voltix Devices · {b.branch} branch
                      </p>
                    </div>
                    <p className="font-display text-sm font-semibold text-foreground">{b.account}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Use your order reference as the transfer note. We confirm within one working hour.
                </p>
              </div>
            )}

            <label className="mt-4 flex items-start gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="mt-0.5 size-4 accent-[var(--primary)]"
              />
              <span>
                Simulate a failed payment
                <span className="block text-xs text-muted-foreground">
                  Lets you see the failure email and the retry screen.
                </span>
              </span>
            </label>
          </section>
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-base font-bold text-foreground">Your order</h2>
            <ul className="mt-3 space-y-2">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-foreground">
                    {l.qty} × {l.name}
                  </span>
                  <span className="shrink-0 font-medium text-foreground">
                    {formatKwacha(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-foreground">{formatKwacha(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="text-foreground">
                  {delivery === 0 ? 'Free' : formatKwacha(delivery)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold">
                <dt className="text-foreground">Total</dt>
                <dd className="text-foreground">{formatKwacha(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => void submit()}
              disabled={busy}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {stage === 'form' && (
                <>
                  Pay {formatKwacha(total)}
                  <ArrowRight className="size-4" />
                </>
              )}
              {stage === 'sending' && (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                  Contacting the payment service
                </>
              )}
              {stage === 'approving' && (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                  Waiting for approval
                </>
              )}
            </button>
            <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              A receipt email is sent whether the payment succeeds or fails.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

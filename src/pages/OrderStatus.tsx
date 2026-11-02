import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Copy, Mail, XCircle } from 'lucide-react'
import { formatKwacha } from '@/data/products'
import { getOrder, payOrder } from '@/lib/store-api'
import type { Order } from '@/lib/store-api'

const METHOD_LABEL: Record<Order['method'], string> = {
  airtel: 'Airtel Money',
  mtn: 'MTN MoMo',
  zamtel: 'Zamtel Kwacha',
  bank: 'Bank transfer',
}

export function OrderStatus() {
  const { reference = '' } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [retrying, setRetrying] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    void getOrder(reference).then((found) => {
      if (!active) return
      setOrder(found)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [reference])

  const retry = async () => {
    setRetrying(true)
    const updated = await payOrder(reference)
    setOrder(updated)
    setRetrying(false)
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Order not found</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Check the reference in your email, or start a new order.
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

  const paid = order.status === 'paid'
  const email = order.emails[order.emails.length - 1]

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <div
        className={paid ? 'rounded-2xl bg-accent p-5' : 'rounded-2xl bg-muted p-5'}
      >
        <p className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          {paid ? (
            <CheckCircle2 className="size-6 text-primary" />
          ) : (
            <XCircle className="size-6 text-destructive" />
          )}
          {paid ? 'Payment confirmed' : 'Payment did not go through'}
        </p>
        <p className="mt-1 text-sm text-foreground/80">
          {paid
            ? `We sent a receipt to ${order.customer.email}. Your device ships within 24 hours.`
            : `Nothing was charged. The failure notice went to ${order.customer.email}.`}
        </p>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(order.reference)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-display text-sm font-semibold text-foreground hover:bg-muted"
        >
          {order.reference}
          <Copy className="size-3.5" />
          {copied && <span className="text-xs font-normal text-muted-foreground">copied</span>}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="font-display text-base font-bold text-foreground">Order summary</h2>
        <ul className="mt-3 divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="min-w-0 text-foreground">
                {item.qty} × {item.name}
              </span>
              <span className="shrink-0 font-medium text-foreground">
                {formatKwacha(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3 font-display text-base font-bold">
          <span className="text-foreground">Total paid</span>
          <span className="text-foreground">{formatKwacha(order.amount)}</span>
        </div>
        <dl className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Paid with</dt>
            <dd className="font-medium text-foreground">{METHOD_LABEL[order.method]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Delivery to</dt>
            <dd className="font-medium text-foreground">
              {order.customer.address}, {order.customer.city}
            </dd>
          </div>
        </dl>

        {!paid && (
          <button
            type="button"
            onClick={() => void retry()}
            disabled={retrying}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {retrying ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                Trying again
              </>
            ) : (
              'Try the payment again'
            )}
          </button>
        )}
      </div>

      {email && (
        <div className="mt-4 rounded-2xl border border-border bg-muted/60 p-4 sm:p-5">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Mail className="size-4 text-primary" /> Email sent to {email.to}
          </p>
          <div className="mt-3 rounded-xl border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Subject</p>
            <p className="text-sm font-semibold text-foreground">{email.subject}</p>
            <p className="mt-2 text-xs text-muted-foreground">Message</p>
            <p className="text-sm text-foreground/85">{email.body}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Sent {new Date(email.sentAt).toLocaleString()}
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Demo mode: this receipt is generated in the browser. In production it is sent by the
            server the moment the payment status changes.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/shop"
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Keep shopping
        </Link>
        <Link
          to="/support"
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4"
        >
          Talk to a person
        </Link>
      </div>
    </div>
  )
}

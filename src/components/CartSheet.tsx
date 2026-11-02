import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { SafeImage } from '@/components/ui/safe-image'
import { useCart } from '@/lib/cart'
import { formatKwacha } from '@/data/products'

export function CartSheet() {
  const { lines, isOpen, closeCart, setQty, remove, subtotal } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col gap-0 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="font-display text-lg">Your bag</SheetTitle>
          <SheetDescription>
            {lines.length === 0
              ? 'Nothing here yet. Devices you add show up in this list.'
              : 'Delivery is free on orders above K15,000.'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="grid place-items-center py-16 text-center">
              <ShoppingBag className="size-8 text-muted-foreground" />
              <p className="mt-3 font-display text-base font-bold text-foreground">
                Your bag is empty
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="mt-3 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Browse devices
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-2.5"
                >
                  <SafeImage
                    src={line.image}
                    alt={line.name}
                    className="size-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{line.name}</p>
                    <p className="text-sm text-muted-foreground">{formatKwacha(line.price)}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(line.id, line.qty - 1)}
                        aria-label={`Remove one ${line.name}`}
                        className="grid size-7 place-items-center rounded-lg border border-border bg-background text-foreground hover:bg-muted"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium text-foreground">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.id, line.qty + 1)}
                        aria-label={`Add one ${line.name}`}
                        className="grid size-7 place-items-center rounded-lg border border-border bg-background text-foreground hover:bg-muted"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="ml-auto grid size-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between font-display text-base font-bold text-foreground">
              <span>Subtotal</span>
              <span>{formatKwacha(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="mt-3 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Go to checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

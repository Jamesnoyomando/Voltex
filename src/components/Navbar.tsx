import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useCart } from '@/lib/cart'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'Phones', to: '/shop?category=phones' },
  { label: 'Laptops', to: '/shop?category=laptops' },
  { label: 'How to order', to: '/#how-to-order' },
  { label: 'Support', to: '/support' },
]

export function Navbar() {
  const { count, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="flex items-center justify-between gap-3 py-3">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <span className="hidden w-40 text-sm text-muted-foreground md:block">
            Lusaka, Zambia
          </span>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
              <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
                <path d="M13.5 2 4 14h6l-1.5 8L20 9h-6.5L13.5 2Z" />
              </svg>
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Voltix</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav
          aria-label="Main"
          className={cn(
            'border-t border-border/70',
            mobileOpen ? 'block' : 'hidden md:block',
          )}
        >
          <ul className="flex flex-col gap-1 py-2 md:flex-row md:items-center md:justify-center md:gap-8 md:py-2.5">
            {links.map((link) =>
              link.to.startsWith('/#') ? (
                <li key={link.label}>
                  <a
                    href={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:py-0"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block py-1.5 text-sm font-medium transition-colors md:py-0',
                        isActive && link.to === '/shop'
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
      <div className="h-px w-full bg-border" />
    </header>
  )
}

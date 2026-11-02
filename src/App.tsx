import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { CartProvider } from '@/lib/cart'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartSheet } from '@/components/CartSheet'
import { Home } from '@/pages/Home'
import { Shop } from '@/pages/Shop'
import { ProductDetail } from '@/pages/ProductDetail'
import { Checkout } from '@/pages/Checkout'
import { OrderStatus } from '@/pages/OrderStatus'
import { Support } from '@/pages/Support'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
        That page has left the shelf
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        The link is old or the device has been retired. The shop is still open.
      </p>
      <Link
        to="/shop"
        className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Browse devices
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CartProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:reference" element={<OrderStatus />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <CartSheet />
            <Footer />
          </div>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

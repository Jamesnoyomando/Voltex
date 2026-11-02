import { PRODUCTS } from '@/data/products'
import type { Product } from '@/data/products'

export type Operator = 'airtel' | 'mtn' | 'zamtel'
export type PaymentMethod = Operator | 'bank'
export type OrderStatus = 'pending' | 'awaiting_payment' | 'paid' | 'failed'

export interface OrderItem {
  id: string
  name: string
  price: number
  qty: number
}

export interface OrderEmail {
  to: string
  subject: string
  body: string
  kind: 'success' | 'failure'
  sentAt: string
}

export interface Order {
  reference: string
  customer: { name: string; email: string; phone: string; city: string; address: string }
  items: OrderItem[]
  amount: number
  method: PaymentMethod
  status: OrderStatus
  createdAt: string
  emails: OrderEmail[]
}

const ORDERS_KEY = 'voltix.orders.v1'
const LATENCY = 320

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Order[]) : []
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    /* storage unavailable */
  }
}

function persist(order: Order): Order {
  const orders = readOrders()
  const index = orders.findIndex((o) => o.reference === order.reference)
  if (index === -1) orders.unshift(order)
  else orders[index] = order
  writeOrders(orders)
  return order
}

/**
 * DEMO DATA LAYER.
 * Every function here has the same shape as its Supabase equivalent, so connecting
 * Supabase later only swaps the body of each function:
 *
 *   supabase.from('products').select('*').order('name')            -> listProducts
 *   supabase.from('products').select('*').eq('slug', slug).single() -> getProduct
 *   supabase.from('orders').insert({...}).select().single()         -> createOrder
 *   supabase.from('orders').select('*').eq('reference', ref).single()-> getOrder
 *
 * The email receipt is written by a server function in production; here it is
 * appended to the order so the confirmation screen can preview it.
 */
export async function listProducts(): Promise<Product[]> {
  await wait(LATENCY)
  return PRODUCTS
}

export async function getProduct(slug: string): Promise<Product | null> {
  await wait(LATENCY)
  return PRODUCTS.find((p) => p.slug === slug) ?? null
}

export function operatorForPhone(phone: string): Operator | null {
  const digits = phone.replace(/\D/g, '').replace(/^260/, '').replace(/^0/, '')
  if (/^(97|77|57)/.test(digits)) return 'airtel'
  if (/^(96|76)/.test(digits)) return 'mtn'
  if (/^(95|75)/.test(digits)) return 'zamtel'
  return null
}

export function normalisePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^260/, '')
  return digits.startsWith('0') ? digits : `0${digits}`
}

export function newReference(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  const stamp = Date.now().toString().slice(-5)
  return `VTX-${stamp}${rand}`
}

export async function createOrder(input: {
  customer: Order['customer']
  items: OrderItem[]
  amount: number
  method: PaymentMethod
}): Promise<Order> {
  await wait(LATENCY)
  const order: Order = {
    reference: newReference(),
    customer: input.customer,
    items: input.items,
    amount: input.amount,
    method: input.method,
    status: 'awaiting_payment',
    createdAt: new Date().toISOString(),
    emails: [],
  }
  return persist(order)
}

export async function getOrder(reference: string): Promise<Order | null> {
  await wait(120)
  return readOrders().find((o) => o.reference === reference) ?? null
}

export function listOrders(): Order[] {
  return readOrders()
}

function receiptBody(order: Order, paid: boolean): string {
  const lines = order.items.map((i) => `${i.qty} x ${i.name}`).join(', ')
  return paid
    ? `Payment received for ${order.reference}: ${lines}. We will deliver to ${order.customer.address}, ${order.customer.city} within 24 hours.`
    : `Payment for ${order.reference} did not go through. Nothing was charged. You can retry the ${lines} order whenever you are ready.`
}

/** Simulates the mobile money / bank collection and the receipt email. */
export async function payOrder(reference: string, options: { fail?: boolean } = {}): Promise<Order> {
  await wait(2400)
  const order = readOrders().find((o) => o.reference === reference)
  if (!order) throw new Error('Order not found')

  const paid = !options.fail
  const updated: Order = {
    ...order,
    status: paid ? 'paid' : 'failed',
    emails: [
      ...order.emails,
      {
        to: order.customer.email,
        subject: paid
          ? `Voltix: payment confirmed for ${order.reference}`
          : `Voltix: payment failed for ${order.reference}`,
        body: receiptBody(order, paid),
        kind: paid ? 'success' : 'failure',
        sentAt: new Date().toISOString(),
      },
    ],
  }
  return persist(updated)
}

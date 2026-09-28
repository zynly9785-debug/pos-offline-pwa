import db from './pouchdb'

const SESSION_KEY = 'muhasbi_session'
export type Role = 'manager' | 'cashier' | 'inventory'
export type Session = { id: string; name: string; phone: string; role: Role; permissions: string[] }

export function getSession(): Session | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}
export function isAuthenticated() { return Boolean(getSession()) }
export async function login(phone: string, code: string): Promise<Session> {
  if (!phone || code !== '123456') throw new Error('invalid_credentials')
  const session: Session = { id: `user:${phone}`, name: 'مدير المتجر', phone, role: 'manager', permissions: ['*'] }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  try { await db.put({ _id: `audit:${Date.now()}`, type: 'audit', action: 'login', actor: phone, created_at: new Date().toISOString() }) } catch {}
  return session
}
export function logout() { localStorage.removeItem(SESSION_KEY); location.href = '/login' }

import PouchDB from 'pouchdb-browser'

export type Currency = 'YER' | 'SAR' | 'USD'
export type Product = {
  _id: string; type: 'product'; name_ar: string; name_en: string; barcode?: string
  sell_price: number; cost_price: number; stock: number; min_stock: number; currency: Currency
}
export type Sale = {
  _id: string; type: 'sale'; lines: Array<Product & { qty: number; lineTotal: number }>
  subtotal: number; discount: number; total: number; currency: Currency
  payment_method: 'cash' | 'wallet' | 'credit'; created_at: string; synced?: boolean
}

const db = new PouchDB('muhasbi_local_v2')
const syncUrl = import.meta.env.VITE_COUCHDB_URL as string | undefined
let syncHandler: PouchDB.Replication.Sync<{}> | undefined

async function list<T>(type: string): Promise<T[]> {
  const result = await db.allDocs<T>({ include_docs: true, startkey: `${type}:`, endkey: `${type}:\uffff` })
  return result.rows.flatMap(row => row.doc ? [row.doc] : [])
}

async function syncWithServer() {
  if (!syncUrl || !navigator.onLine) return { status: 'skipped' as const }
  syncHandler?.cancel()
  syncHandler = db.sync(syncUrl, { live: false, retry: true })
  await new Promise<void>((resolve, reject) => {
    syncHandler?.on('complete', () => resolve()).on('error', reject)
  })
  return { status: 'synced' as const }
}

const api = {
  db,
  put: (doc: PouchDB.Core.Document<any>) => db.put(doc),
  get: (id: string) => db.get(id),
  allDocs: (opts: PouchDB.Core.AllDocsOptions<any>) => db.allDocs(opts),
  list,
  syncWithServer,
  configureSync(url: string) { localStorage.setItem('muhasbi_sync_url', url) }
}

window.addEventListener('online', () => { void syncWithServer() })
export default api

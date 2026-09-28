<template>
  <div class="pos-page">
    <header class="topbar">
      <h3>محاسبي - POS</h3>
      <div>
        <button @click="toggleLang">{{ langLabel }}</button>
      </div>
    </header>
    <main>
      <section class="left">
        <h4>{{ $t('products') }}</h4>
        <div class="product-list">
          <div v-for="p in products" :key="p._id" class="product-item">
            <div>{{ p.name_ar || p.name_en }}</div>
            <div>{{ formatCurrency(p.sell_price) }}</div>
            <button @click="addToCart(p)">+</button>
          </div>
        </div>
        <button @click="seedDemo">إضافة منتجات تجريبية</button>
      </section>

      <section class="right">
        <h4>الفاتورة</h4>
        <div v-for="(l, idx) in cart" :key="idx" class="line">
          <div>{{ l.name }} x {{ l.qty }}</div>
          <div>{{ formatCurrency(l.total) }}</div>
        </div>
        <div class="total">{{ $t('total') }}: {{ formatCurrency(total) }}</div>
        <div class="actions">
          <button @click="saveInvoice">حفظ فاتورة (محلي)</button>
          <button @click="syncNow">مزامنة الآن</button>
          <button @click="printBluetooth">طباعة عبر البلوتوث</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import db from '../services/pouchdb'
import { printViaBluetooth } from '../services/printer'

const { locale } = useI18n()
const langLabel = computed(()=> locale.value === 'ar' ? 'EN' : 'AR')
function toggleLang(){ locale.value = locale.value === 'ar' ? 'en' : 'ar' }

const products = ref<any[]>([])
const cart = ref<any[]>([])

onMounted(async ()=>{
  const res = await db.allDocs({ include_docs: true, startkey: 'product_', endkey: 'product_\ufff0' })
  products.value = res.rows.map(r=>r.doc)
})

function formatCurrency(v:number){
  // demo: support multiple currencies (YER, SAR, USD)
  return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-EG' : 'en-US', { style:'currency', currency: 'USD' }).format(v)
}

function addToCart(p:any){
  const item = cart.value.find(i=>i._id===p._id)
  if(item) item.qty++
  else cart.value.push({ _id: p._id, name: p.name_ar||p.name_en, qty:1, price:p.sell_price, total: p.sell_price })
  recalc()
}

function recalc(){
  cart.value.forEach(i=> i.total = i.qty * i.price)
}

const total = computed(()=> cart.value.reduce((s,v)=>s+v.total,0))

async function saveInvoice(){
  const invoice = {
    _id: 'sale_' + Date.now(),
    type: 'sale',
    lines: cart.value,
    total: total.value,
    created_at: new Date().toISOString()
  }
  await db.put(invoice)
  alert('تم حفظ الفاتورة محليًا')
  cart.value = []
}

async function seedDemo(){
  const demo = [
    { _id: 'product_1', name_ar: 'منتج أ', name_en: 'Product A', sell_price: 100 },
    { _id: 'product_2', name_ar: 'منتج ب', name_en: 'Product B', sell_price: 250 }
  ]
  for(const p of demo){
    try{ await db.put(p) }catch(e){}
  }
  const res = await db.allDocs({ include_docs: true, startkey: 'product_', endkey: 'product_\ufff0' })
  products.value = res.rows.map(r=>r.doc)
}

async function syncNow(){
  try{
    await db.syncWithServer()
    alert('مزامنة تمت (mock)')
  }catch(e){ console.error(e); alert('خطأ بالمزامنة') }
}

async function printBluetooth(){
  try{
    await printViaBluetooth({ text: 'فاتورة تجريبية\nالمجموع: ' + total.value })
  }catch(e){ alert('خطأ بالطباعة: '+e.message) }
}
</script>

<style scoped>
.pos-page{font-family:Helvetica}
.topbar{display:flex;justify-content:space-between;align-items:center;padding:12px;background:linear-gradient(90deg,#0f172a,#1e293b);color:#fff}
main{display:flex;gap:16px;padding:16px}
.left{flex:1}
.right{width:360px;background:#fff;border-radius:8px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
.product-item{display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid #eee}
button{background:#0ea5a4;color:#fff;border:none;padding:8px;border-radius:6px}
.total{font-weight:700;margin-top:12px}
</style>

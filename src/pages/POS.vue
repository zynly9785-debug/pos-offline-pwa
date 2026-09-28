<template>
  <section>
    <div class="page-heading"><div><p class="eyebrow">نقطة البيع</p><h1>فاتورة جديدة</h1></div><button class="outline" @click="seedDemo">تحميل بيانات تجريبية</button></div>
    <div class="pos-grid">
      <div class="panel products-panel"><div class="toolbar"><input v-model="query" placeholder="ابحث بالاسم أو الباركود..." /><select v-model="currency"><option value="YER">ريال يمني</option><option value="SAR">ريال سعودي</option><option value="USD">دولار</option></select></div>
        <div class="product-grid"><button v-for="p in filteredProducts" :key="p._id" class="product-card" @click="add(p)"><span class="product-icon">▦</span><strong>{{ p.name_ar }}</strong><small>{{ p.stock }} متوفر</small><b>{{ money(p.sell_price, p.currency) }}</b></button></div>
        <div v-if="!filteredProducts.length" class="empty">لا توجد منتجات. اضغط تحميل بيانات تجريبية للبدء.</div>
      </div>
      <div class="panel invoice-panel"><div class="panel-title"><h2>تفاصيل الفاتورة</h2><span class="badge">{{ cart.length }} أصناف</span></div><div class="cart-lines"><div v-for="line in cart" :key="line._id" class="cart-line"><div><strong>{{ line.name_ar }}</strong><small>{{ money(line.sell_price, currency) }}</small></div><div class="qty"><button @click="changeQty(line._id, -1)">−</button><b>{{ line.qty }}</b><button @click="changeQty(line._id, 1)">+</button></div><strong>{{ money(line.lineTotal, currency) }}</strong></div><div v-if="!cart.length" class="empty">أضف المنتجات إلى الفاتورة</div></div>
        <div class="summary"><div><span>المجموع الفرعي</span><b>{{ money(subtotal, currency) }}</b></div><div><span>الخصم</span><input v-model.number="discount" type="number" min="0" /></div><div class="grand"><span>الإجمالي</span><b>{{ money(total, currency) }}</b></div></div><div class="payment"><label>طريقة الدفع</label><div class="payment-options"><button v-for="method in methods" :key="method.id" :class="{selected: payment === method.id}" @click="payment = method.id">{{ method.label }}</button></div></div><button class="primary full" :disabled="!cart.length" @click="saveInvoice">حفظ الفاتورة محلياً</button><button class="outline full" :disabled="!cart.length" @click="print">🖨 طباعة / بلوتوث</button></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import db, { type Currency, type Product } from '../services/pouchdb'
import { printViaBluetooth } from '../services/printer'
const products = ref<Product[]>([]); const cart = ref<Array<Product & {qty:number; lineTotal:number}>>([]); const query = ref(''); const currency = ref<Currency>('YER'); const discount = ref(0); const payment = ref<'cash'|'wallet'|'credit'>('cash')
const methods = [{id:'cash',label:'نقدي'},{id:'wallet',label:'محفظة'},{id:'credit',label:'آجل'}] as const
const filteredProducts = computed(() => products.value.filter(p => `${p.name_ar} ${p.name_en} ${p.barcode ?? ''}`.toLowerCase().includes(query.value.toLowerCase())))
const subtotal = computed(() => cart.value.reduce((s, p) => s + p.lineTotal, 0)); const total = computed(() => Math.max(0, subtotal.value - Number(discount.value || 0)))
function money(value:number, code:Currency) { return new Intl.NumberFormat('ar-YE', {style:'currency', currency: code, maximumFractionDigits: 0}).format(value) }
function add(p:Product) { const line = cart.value.find(x => x._id === p._id); if (line) line.qty++; else cart.value.push({...p, qty:1, lineTotal:p.sell_price}); recalc() }
function changeQty(id:string, delta:number) { const line=cart.value.find(x=>x._id===id); if (!line) return; line.qty += delta; if(line.qty<=0) cart.value=cart.value.filter(x=>x._id!==id); recalc() }
function recalc(){ cart.value.forEach(x => x.lineTotal=x.qty*x.sell_price) }
async function load(){ products.value=await db.list<Product>('product') }
async function seedDemo(){ for(const p of [{_id:'product:coffee',type:'product',name_ar:'قهوة محمصة',name_en:'Roasted Coffee',sell_price:1800,cost_price:1200,stock:24,min_stock:5,currency:'YER'},{_id:'product:water',type:'product',name_ar:'مياه معدنية',name_en:'Mineral Water',sell_price:300,cost_price:180,stock:7,min_stock:10,currency:'YER'},{_id:'product:tea',type:'product',name_ar:'شاي فاخر',name_en:'Premium Tea',sell_price:2500,cost_price:1700,stock:16,min_stock:4,currency:'YER'}] as Product[]) { try{await db.put(p)}catch{} } await load() }
async function saveInvoice(){ const now=new Date().toISOString(); await db.put({_id:`sale:${Date.now()}`,type:'sale',lines:cart.value,subtotal:subtotal.value,discount:Number(discount.value||0),total:total.value,currency:currency.value,payment_method:payment.value,created_at:now,synced:false}); for(const line of cart.value){const p=await db.get(line._id) as Product; await db.put({...p,stock:Math.max(0,p.stock-line.qty)})} cart.value=[]; discount.value=0; await load(); alert('تم حفظ الفاتورة محلياً بنجاح') }
async function print(){ await printViaBluetooth({text:`محاسبي\nالإجمالي: ${money(total.value,currency.value)}\nطريقة الدفع: ${payment.value}`}) }
onMounted(load)
</script>

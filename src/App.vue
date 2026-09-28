<template>
  <div class="shell" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <header class="topbar">
      <button class="mobile-menu ghost" @click="menuOpen = !menuOpen" aria-label="فتح القائمة">☰</button>
      <div class="brand"><span class="brand-mark">م</span><div><strong>محاسبي</strong><small>إدارة متجرك بسهولة</small></div></div>
      <div class="top-actions"><span class="connection" :class="{offline: !online}"><i />{{ online ? 'متصل' : 'بدون إنترنت' }}</span><button class="ghost" @click="toggleLang">{{ locale === 'ar' ? 'EN' : 'عربي' }}</button><button class="ghost logout" @click="logout">خروج</button></div>
    </header>
    <div class="layout">
      <aside class="sidebar" :class="{open: menuOpen}"><nav><RouterLink v-for="item in menu" :key="item.to" :to="item.to" @click="menuOpen=false"><span class="nav-icon">{{ item.icon }}</span><span>{{ item.label }}</span></RouterLink></nav><div class="sidebar-footer"><span class="sync-dot" /> البيانات محفوظة محلياً<br /><small>v0.3 • متجر محاسبي</small></div></aside>
      <main class="content"><RouterView /></main>
    </div>
    <nav class="mobile-nav"><RouterLink to="/pos">🛒<small>البيع</small></RouterLink><RouterLink to="/products">📦<small>المخزون</small></RouterLink><RouterLink to="/reports">📊<small>التقارير</small></RouterLink><RouterLink to="/settings">⚙️<small>المزيد</small></RouterLink></nav>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { logout } from './services/auth'
const { locale } = useI18n(); const online = ref(navigator.onLine); const menuOpen = ref(false)
const menu = [{to:'/pos',icon:'🛒',label:'نقطة البيع'},{to:'/products',icon:'📦',label:'المخزون والمنتجات'},{to:'/customers',icon:'👥',label:'العملاء والديون'},{to:'/suppliers',icon:'🚚',label:'الموردون والمشتريات'},{to:'/expenses',icon:'🧾',label:'المصروفات'},{to:'/accounting',icon:'🧮',label:'المحاسبة'},{to:'/reports',icon:'📊',label:'التقارير والتحليلات'},{to:'/settings',icon:'⚙️',label:'الإعدادات'}]
addEventListener('online',()=>online.value=true); addEventListener('offline',()=>online.value=false)
function toggleLang(){ locale.value=locale.value==='ar'?'en':'ar' }
</script>

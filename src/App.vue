<template>
  <div class="shell" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <header class="topbar">
      <div class="brand"><span class="brand-mark">م</span><div><strong>محاسبي</strong><small>POS • Offline First</small></div></div>
      <div class="top-actions"><span class="connection" :class="{offline: !online}"><i />{{ online ? 'متصل' : 'بدون إنترنت' }}</span><button class="ghost" @click="toggleLang">{{ locale === 'ar' ? 'EN' : 'عربي' }}</button></div>
    </header>
    <div class="layout">
      <aside class="sidebar">
        <nav>
          <RouterLink to="/pos">🛒 <span>نقطة البيع</span></RouterLink>
          <RouterLink to="/products">📦 <span>المنتجات والمخزون</span></RouterLink>
          <RouterLink to="/reports">📊 <span>التقارير</span></RouterLink>
          <RouterLink to="/settings">⚙️ <span>الإعدادات</span></RouterLink>
        </nav>
        <div class="sidebar-footer">v0.2 • متجر محاسبي</div>
      </aside>
      <main class="content"><RouterView /></main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const online = ref(navigator.onLine)
window.addEventListener('online', () => online.value = true)
window.addEventListener('offline', () => online.value = false)
function toggleLang() { locale.value = locale.value === 'ar' ? 'en' : 'ar' }
</script>

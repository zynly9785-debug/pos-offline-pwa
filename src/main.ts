import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import messages from './i18n'
import './styles.css'

const app = createApp(App)
app.use(createPinia()).use(router).use(createI18n({locale:'ar',fallbackLocale:'en',messages}))
app.mount('#app')
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))

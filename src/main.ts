import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import messages from './i18n'

import './styles.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const i18n = createI18n({
  locale: 'ar',
  fallbackLocale: 'en',
  messages
})
app.use(i18n)

app.mount('#app')

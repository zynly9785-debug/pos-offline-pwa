<template>
  <div class="page auth">
    <div class="card">
      <h2>محاسبي</h2>
      <p>{{ $t('welcome') }}</p>
      <input v-model="phone" placeholder="رقم الهاتف" />
      <button @click="sendOtp">{{ $t('send_otp') }}</button>
      <div v-if="sent">
        <input v-model="code" placeholder="كود التحقق" />
        <button @click="verify">{{ $t('verify') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const phone = ref('')
const code = ref('')
const sent = ref(false)
const router = useRouter()

function sendOtp(){
  // mock OTP send
  sent.value = true
  alert('Mock: رمز التحقيق أرسل عبر WhatsApp: 123456')
}
function verify(){
  if(code.value === '123456'){
    // mock login
    router.push('/pos')
  } else {
    alert('رمز غير صحيح (استخدم 123456 للمحاكاة)')
  }
}
</script>

<style scoped>
.page{display:flex;align-items:center;justify-content:center;height:100vh}
.card{width:320px;padding:20px;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,0.08);background:#fff}
input{width:100%;padding:8px;margin:8px 0}
button{width:100%;padding:10px;background:#1e88e5;color:#fff;border:none;border-radius:6px}
</style>

# المرحلة الثانية — Scaffold احترافي

## التشغيل
```bash
npm install
npm run dev
npm run build
```

## ما تم إنجازه
- واجهة Responsive عربية RTL مع تبديل EN.
- POS يعمل دون اتصال ويحفظ الفواتير والمنتجات في IndexedDB عبر PouchDB.
- خصم، طرق دفع نقدي/محفظة/آجل، تحديث المخزون تلقائياً.
- منتجات ومخزون مع تنبيه حد إعادة الطلب.
- لوحة تقارير أولية ونسخ احتياطي JSON.
- Service Worker وManifest كتطبيق PWA.
- مزامنة CouchDB اختيارية وآمنة عبر `VITE_COUCHDB_URL`؛ لا تضع الأسرار في الواجهة.
- زر الطباعة يعمل في الويب، وطبقة `printer.ts` جاهزة لاستبدالها بمحول Capacitor ESC/POS للطباعة الحرارية الفعلية على Android.

## تفعيل CouchDB
أنشئ ملف `.env.local`:
```env
VITE_COUCHDB_URL=https://user:password@example.com/muhasbi
```
لا ترفع هذا الملف إلى GitHub. المصادقة والإذن وقواعد الصلاحيات يجب أن تُنفذ في Backend قبل الإنتاج.

## ملاحظة إنتاجية
هذا إصدار واجهة وOffline MVP، وليس نظام محاسبة قانونياً أو خدمة OTP/WhatsApp جاهزة للإنتاج. قبل الإطلاق يجب إضافة Backend، JWT/OTP حقيقي، قواعد صلاحيات، ترحيلات محاسبية، اختبارات، وسياسة تعارض للمزامنة.

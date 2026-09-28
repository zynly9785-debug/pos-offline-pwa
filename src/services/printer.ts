export async function printViaBluetooth(payload:{text:string}) {
  // Web Bluetooth is intentionally not used for ESC/POS here because browser permissions
  // and printer profiles vary. Capacitor Android should call the native ESC/POS adapter.
  const w=window.open('','_blank'); if(!w) throw new Error('تعذر فتح نافذة الطباعة')
  w.document.write(`<html dir="rtl"><body><pre style="font:18px monospace">${payload.text.replace(/[<&>]/g,'')}</pre><script>window.print();window.close()<\/script></body></html>`);w.document.close()
}

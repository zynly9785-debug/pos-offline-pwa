// Bluetooth printing placeholder
// In Capacitor you would use a native plugin or cordova plugin for Bluetooth printing.
// This file provides a demo API and will attempt to use Web Bluetooth if available (limited support).

export async function printViaBluetooth(payload:{text:string}){
  // For demo: open print dialog as fallback
  if(navigator && (navigator as any).bluetooth){
    // Advanced: connect to device and send ESC/POS bytes
    throw new Error('Bluetooth printing not fully implemented in web demo. Use Capacitor native plugin on device.')
  }
  // fallback: open a printable window
  const w = window.open('', '_blank')
  if(!w) throw new Error('فتح نافذة الطباعة منعه المتصفح')
  w.document.write('<pre>' + payload.text + '</pre>')
  w.document.close()
  w.focus()
  w.print()
  w.close()
}

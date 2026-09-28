# Setup & Run

1. Clone the repo

   git clone https://github.com/zynly9785-debug/pos-offline-pwa
   cd pos-offline-pwa

2. Install

   npm install

3. Run dev server

   npm run dev

4. Open http://localhost:5173

5. Demo credentials / OTP

   - Enter any phone number, click Send OTP (mock)
   - Use code: 123456 to login

Notes:
- PouchDB local is used (pos_local_db)
- Bluetooth printing is enabled as placeholder; for real Bluetooth printing build with Capacitor and a native plugin
- Currencies preconfigured: YER, SAR, USD

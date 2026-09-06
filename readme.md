# 🏪 Gauteng Shopping Hub - Pi Mainnet LIVE

**Part of Ndhlovu36 6-App Ecosystem | Johannesburg, South Africa**
**Pi Network Utility: Real Commerce | Pi Payments Enabled**

Live: https://ndhlovu36.github.io/gauteng-shopping-hub/
Ecosystem Hub: https://ndhlovu36.github.io/gauteng-shopping-hub/ecosystem.html

## What This App Does (Real Utility)

Gauteng Shopping Hub is the CENTRAL MALL for 5 other real businesses. Users in Gauteng shop for:
- Marble floors & tiles (from Marble Floors SA)
- Farming tools (from Agri Equipment Market)
- Building services (from Resurrected Building Projects)

All checkout is in Pi (Pi Mainnet).

## The 6-App Ecosystem Sequence

This is not 6 separate apps - it's ONE business system with 6 departments:

1.  **User Logs in with Pi** in any of the 6 apps -> `ecosystem.js` saves `pi_username` to localStorage, shared across apps.
2.  **Shopping:** User browses Hub and adds Marble Tiles (e.g., 50sqm = 5 Pi)
3.  **Payment 1:** `Pi.createPayment()` 5 Pi for product -> goes to Marble Floors SA wallet.
4.  **Auto-Job Creation:** Hub calls `NDHLOVU_ECOSYSTEM.createCrossAppOrder('hub','building', {install: '50sqm'})`
5.  **Payment 2 (if install needed):** Resurrected Building Projects charges 2 Pi for installation labor.
6.  **Auto-Delivery:** Hub calls `createCrossAppOrder('hub','logistics', {address: 'Soweto'})`
7.  **Payment 3:** Revealed Logistics charges 0.5 Pi delivery fee.
8.  **Auto-Transport:** If workers need to travel, Resurrected Building books seats on Revelation Bus Company (0.2 Pi per worker).
9.  **Single Receipt:** All Pi payments linked to one Pi username, one transaction chain.

**Pi Flow:** `Shopper -> Hub (5 Pi) -> Marble (5 Pi) -> Building (2 Pi) -> Logistics (0.5 Pi) -> Bus (0.2 Pi)`

## Why Pi Network Needs This

- Real goods, not digital demo
- KYC contractors in South Africa
- Pi is used for real transport, delivery, building - not just test
- Keeps Pi circulating inside Gauteng economy

## Tech - Mainnet Ready

- SDK: `https://sdk.minepi.com/pi-sdk.js`
- Init: `Pi.init({version: "2.0", sandbox: false})`
- Auth: `Pi.authenticate(['username','payments'], onIncompletePaymentFound)`
- Payments: Full `createPayment`, `approve`, `complete` flow implemented

## Compliance

- Privacy: /privacy.html
- Terms: /terms.html
- Report: /report.html
- Contact: ndhlovu36@gmail.com
- Business Reg: Sole Prop - Johannesburg, Gauteng, SA

## Sister Apps (All Same Developer ndhlovu36)

- Marble Floors SA [LIVE]: https://ndhlovu36.github.io/marble-floors-south-africa/
- Agri Equipment Market [LIVE]: https://ndhlovu36.github.io/agricultural-equipment-market/
- Resurrected Building Projects: https://ndhlovu36.github.io/resurrected-building-projects/
- Revelation Bus Company: https://ndhlovu36.github.io/revelation-bus-company/
- Revealed Logistics: https://ndhlovu36.github.io/revealed-logistics/

Developer: ndhlovu36@gmail.com | Pi Mainnet Wallet Verified
Update:Fixed-SupaBase-2026

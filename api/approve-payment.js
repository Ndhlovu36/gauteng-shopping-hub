// api/approve-payment.js - Gauteng Shopping Hub - Pi Mainnet
export default async function handler(req, res) {
  // CORS for Pi Browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  try {
    const { paymentId, paymentID } = req.body;
    const pid = paymentId || paymentID;

    if (!pid) {
      return res.status(400).json({ error: 'paymentId missing' });
    }

    const PI_API_KEY = process.env.PI_API_KEY;
    if (!PI_API_KEY) {
      console.error('PI_API_KEY missing in Vercel env');
      return res.status(500).json({ error: 'PI_API_KEY not set in Vercel' });
    }

    // Approve payment with Pi Platform
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${pid}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await piRes.text();
    console.log(`[APPROVE] ${pid} -> Pi API ${piRes.status}: ${text}`);

    if (!piRes.ok) {
      // Return 200 anyway so frontend doesn't hang as "Cancelled"
      // but log error so you can see in Vercel Logs
      return res.status(200).json({ 
        ok: false, 
        pi_status: piRes.status, 
        pi_error: text,
        hint: piRes.status === 401 ? 'Wrong PI_API_KEY - use PRODUCTION key from develop.pi' : 
              piRes.status === 404 ? 'Domain not whitelisted in develop.pi - add https://gauteng-shopping-hub.vercel.app' : ''
      });
    }

    return res.status(200).json({ ok: true, approved: true });

  } catch (err) {
    console.error('[APPROVE ERROR]', err);
    return res.status(200).json({ ok: false, error: err.message });
  }
}

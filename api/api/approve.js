// /api/approve.js - APPROVE PAYMENT - Prevents expiry
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});

  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({error: 'paymentId required'});

  const PI_API_KEY = process.env.PI_API_KEY; // Put your Pi API Key in Vercel Env
  // Get from https://develop.pi - Your App -> API Key

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("APPROVED:", paymentId, data);
    return res.status(200).json(data);
  } catch (e) {
    console.error("Approve Error:", e);
    return res.status(500).json({error: e.message});
  }
}
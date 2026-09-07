// api/complete-payment.js - Gauteng Shopping Hub - Pi Mainnet
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  try {
    const { paymentId, paymentID, txid, txID, transactionId } = req.body;
    const pid = paymentId || paymentID;
    const transaction = txid || txID || transactionId;

    if (!pid) return res.status(400).json({ error: 'paymentId missing' });
    if (!transaction) return res.status(400).json({ error: 'txid missing' });

    const PI_API_KEY = process.env.PI_API_KEY;
    if (!PI_API_KEY) {
      console.error('PI_API_KEY missing');
      return res.status(500).json({ error: 'PI_API_KEY not set' });
    }

    // Complete payment with Pi Platform
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${pid}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid: transaction }),
    });

    const text = await piRes.text();
    console.log(`[COMPLETE] ${pid} tx:${transaction} -> Pi API ${piRes.status}: ${text}`);

    if (!piRes.ok) {
      return res.status(200).json({ 
        ok: false, 
        pi_status: piRes.status, 
        pi_error: text,
        hint: 'Check if payment was already completed'
      });
    }

    // TODO: Save order to your database here
    // Example: await db.orders.update({paymentId: pid, status: 'PAID', txid: transaction})

    return res.status(200).json({ ok: true, completed: true, txid: transaction });

  } catch (err) {
    console.error('[COMPLETE ERROR]', err);
    return res.status(200).json({ ok: false, error: err.message });
  }
}

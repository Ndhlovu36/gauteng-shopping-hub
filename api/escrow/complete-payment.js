import { createClient } from '@supabase/supabase-js';
const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
export default async function handler(req,res){
  const {paymentId,txid,productId,sellerId,buyerUsername,listingType}=req.body;
  const PI_KEY=process.env.PI_API_KEY?.trim();
  const piRes=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{method:'POST',headers:{'Authorization':`Key ${PI_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({txid})});
  const piData=await piRes.json();if(!piRes.ok)return res.status(400).json(piData);
  const amount=piData.amount;const commission=amount*0.05;const sellerGets=amount-commission;
  await supabase.from('escrow_transactions').insert({payment_id:paymentId,txid,buyer_username:buyerUsername,seller_business_id:sellerId,product_id:productId,amount_pi:amount,commission_pi:commission,seller_gets_pi:sellerGets,status:'escrow_held',listing_type:listingType||'sale'});
  return res.json({success:true,you_keep:commission,seller_gets:sellerGets});
}

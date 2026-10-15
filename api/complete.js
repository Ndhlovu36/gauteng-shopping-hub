export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS') return res.status(200).end();
 if(req.method!=='POST') return res.status(405).json({error:'POST only'});
 const {paymentId,txid}=req.body;
 const key=process.env.PI_API_KEY;
 try{
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{method:'POST',headers:{'Authorization':`Key ${key}`,'Content-Type':'application/json'},body:JSON.stringify({txid})});
  const d=await r.json(); console.log("COMPLETED",paymentId,txid); return res.status(200).json(d);
 }catch(e){ return res.status(500).json({error:e.message}) }
}
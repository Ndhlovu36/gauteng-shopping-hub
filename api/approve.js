export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS') return res.status(200).end();
 if(req.method!=='POST') return res.status(405).json({error:'POST only'});
 const {paymentId}=req.body;
 const key=process.env.PI_API_KEY;
 if(!key) return res.status(500).json({error:'PI_API_KEY missing in Vercel env'});
 try{
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{method:'POST',headers:{'Authorization':`Key ${key}`}});
  const d=await r.json(); console.log("APPROVED",paymentId); return res.status(200).json(d);
 }catch(e){ return res.status(500).json({error:e.message}) }
}
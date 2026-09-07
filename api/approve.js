export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const {paymentId}=req.body;
    if(!paymentId) return res.status(400).json({error:'no paymentId'});
    const key=process.env.PI_API_KEY;
    if(!key) return res.status(500).json({error:'PI_API_KEY missing in Vercel env'});
    const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
      method:'POST',
      headers:{'Authorization':`Key ${key}`,'Content-Type':'application/json'}
    });
    const data=await r.text();
    console.log('approve',r.status,data);
    return res.status(200).json({ok:true, pi_status:r.status});
  }catch(e){
    console.error(e);
    return res.status(200).json({ok:false, error:e.message}); // return 200 so frontend doesn't hang
  }
}

export default async function handler(req,res){
  const {paymentId}=req.body;
  const PI_KEY=process.env.PI_API_KEY?.trim();
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{method:'POST',headers:{'Authorization':`Key ${PI_KEY}`}});
  const data=await r.json();res.status(r.ok?200:400).json(data);
}

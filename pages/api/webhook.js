import connectDB from "../../lib/mongoose";
import { buffer } from "micro";
import Order from "../../models/Orders";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler (req, res){
    await connectDB();
    const signingSecret = 'whsec_c0f5c373fecf8484232c4797aaa65308451166b04a3ddc82495a1f4541ec8d98'
    const payload = await buffer(req)
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);
    if(event?.type === 'checkout.session.completed'){
        const metadata = event.data?.object.metadata;
        const paymentStatus = event.data?.object?.payment_status
        if (metadata?.orderId && paymentStatus === 'paid'){
            const order = await Order.findByIdAndUpdate(metadata.orderId, {paid:1})
        }
    }
    res.json('ok')
} 

export const config = {
    api: {
        bodyParser: false,
    }
}
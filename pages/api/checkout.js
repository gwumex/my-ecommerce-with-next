import connectDB from "../../lib/mongoose"
import Product from '../../models/Product';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    await connectDB();
    if(req.method !== 'POST') {
        res.json('Not a post request')
    }
    const {email} = req.body
    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)];
    const products = await Product.find({_id:{$in:uniqIds}}).exec()

    let line_items = []
    for (let productId of uniqIds){
        const quantity = productsIds.filter(id => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: {name: product.name},
            unit_amount: product.price * 100
          },
         })
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);

    res.json(req.method)
}
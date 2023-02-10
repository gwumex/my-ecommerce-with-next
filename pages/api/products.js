const connectDB = require('../../lib/mongoose');
import Product from "../../models/product";

export async function findAllProducts() {
    return Product.find().exec();
}

export default async function handle (req, res) {
    await connectDB();
    const {ids} = req.query;
    if (ids){
        const idsArray = ids.split(",")
       return res.json(await Product.find({_id: {$in:idsArray}}).exec())
    } else {
        res.json(null)
    }
}
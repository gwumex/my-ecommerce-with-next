const connectDB = require('../../lib/mongoose');
import Product from "../../models/product";

export async function findAllProducts() {
    return Product.find().exec();
}

export default async function handle (req, res) {
    await connectDB();
    res.json(await findAllProducts())
}
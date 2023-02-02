const connectDB = require('../../lib/mongoose');
import Product from "../../models/product";

export default async function handle (req, res) {
    await connectDB();
    res.json(await Product.find().exec())
}
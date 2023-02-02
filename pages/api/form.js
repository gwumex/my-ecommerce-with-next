import { connectDB } from "../../lib/mongoose";
import Products from "../../models/product";

export default async function handle (req, res) {
   connectDB();
    console.log(cn);

    // res.json(await Products.find().exec())
}
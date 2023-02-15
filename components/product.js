import { useContext } from "react";
import { ProductsContext } from "../context/productContext";
import Link from "next/link";
import Image from "next/image";

export default function Product(product) {
    const {setSelectedProducts} = useContext(ProductsContext);
    function addProduct(_id){
        setSelectedProducts(p => [...p, product._id])
    }
    return (
        <div className="w-64">
            <div className="bg-emerald-100 p-5 rounded-xl  hover:drop-shadow-md">
            <Link href={`/productPage/?id=${product._id}`}>
            <Image src={product.picture} alt={product.name} width={500} height={500} blurDataURL="Loading"/>
            </Link>
            </div>
            <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
            </div>
            <p className="text-sm mt-2">{product.description}
            </p>
            <div className="flex">
                <div className="text-2xl font-bold grow">${product.price}</div>
                <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl text" onClick={addProduct
                }> + </button>
            </div>
        </div>
    );
}
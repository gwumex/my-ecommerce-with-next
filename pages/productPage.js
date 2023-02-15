import React from 'react'
import { useContext } from "react";
import { ProductsContext } from '../context/productContext';
import { findOne } from "./api/products";
import connectDB from '../lib/mongoose';
import Layout from '../components/Layout'
import Image from 'next/image';
import Link from 'next/link';

const productPage = ({product}) => {
    const {setSelectedProducts} = useContext(ProductsContext);
    function addProduct(_id){
        setSelectedProducts(p => [...p, product._id])
    }
    return (
      <Layout>
        <div className="flex">
            <div className="bg-blue-100 p-5 rounded-xl max-w-[200px]">
              <Image src={product.picture} alt={product.name} width={500} height={500} />
        </div>
        <div className='pl-4'>
            <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-sm mt-2">{product.description}
        </p>
        <div>
            <div className="text-2xl font-bold grow">${product.price}</div>
            <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl text" onClick={addProduct
            }> + </button>
        </div>
        </div>

          </div>
       
  </Layout>
  )
}

export default productPage

export async function getServerSideProps(context) {
  const id = context.query.id;
    await connectDB();
    const product = await findOne(id);
    return {
      props: {
        hello: "hello",
        product: JSON.parse(JSON.stringify(product[0])),
      }
    }
  }
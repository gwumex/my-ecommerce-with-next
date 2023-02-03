import { useEffect, useState } from "react"
import { Footer } from "../components/Footer";
import Layout from "../components/Layout";
import Product from "../components/product";
import connectDB from "../lib/mongoose";
import { findAllProducts } from "./api/products";

export default function Home ({products}) {
  const [phrase, setPhrase] = useState()

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/products');
  //       const data = await response.json();
  //       setProductsInfo(data);
  //     } catch (error) {
  //       console.error('There was a problem with the fetch operation:', error);
  //     }
  //   }

  //   fetchData();
  // }, [])

  const categoriesName = [...new Set(products?.map(p => p.category))]




  if (!products) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="text-danger">Loading</h1>
    </div>
  }

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase))
  } 

  return (
    <Layout>
    <div className="p-5">
      <input type="text" placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl" onChange={e => setPhrase(e.target.value)} value={phrase} />
      <div >
        {categoriesName.map(categoryName => (
          <div key={categoryName} >
            {products.find(p => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl capitalize py-5">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products.filter(p => p.category === categoryName).map(product => (
                    <div key={product._id} className="px-5 snap-start">
                      <Product {...product} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await connectDB();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
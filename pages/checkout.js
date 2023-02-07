import { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ProductsContext } from '../context/productContext'
export default function CheckOut() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)
    const [productsInfo, setProductsInfo] = useState([])
    const [buyerInfo, setBuyerInfo] = useState({
        address: '',
        city: '',
        name: '',
        email: ''
    })

    function onChange(e){
        setBuyerInfo({...buyerInfo, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)]
        async function getData() {
            const response = await fetch('/api/products?ids=' + uniqIds.join(','))
            const data = await response.json()
            setProductsInfo(data)
        }
        getData()
    }, [selectedProducts])

    function moreOfThisProduct (id) {
        setSelectedProducts(prev => [...prev, id])
    }

    function lessOfThisProduct (id) {
        const pos = selectedProducts.indexOf(id)
        if(pos !== -1){
            setSelectedProducts(prev => {
                return prev.filter((value, index) => index !== pos)
            })
        }
    }

    return (
        <Layout>
            {!productsInfo && (
                <div>no product in your shopping cart</div>
            )}
            {productsInfo && productsInfo.map(
                productInfo => (
                    <div key={productInfo._id} className='flex mb-5'>
                        <div className='bg-gray-100 p-3 rounded-xl'>
                            <img className='w-24' src={productInfo.picture} alt="" />
                        </div>
                        <div className='pl-4'>
                            <h3 className='font-bold text-lg'>{productInfo.name}</h3>
                            <p className='text-sm'>
                                {productInfo.description}
                            </p>
                            <div className='flex'>
                                <div className='grow '>${productInfo.price}</div>
                                <div>
                                    <button className='border border-emarald-500 px-2 rounded-lg text-emerald-500' onClick={() => {lessOfThisProduct(productInfo._id)}}>-</button>
                                    <span className='px-2'>

                                    {selectedProducts.filter(id => id === productInfo._id).length}
                                    </span>
                                    <button className=' bg-emerald-500 px-2 rounded-lg text-white' onClick={() => {moreOfThisProduct(productInfo._id)}}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='mt-4 max-w-[500px]'>
                    <input name='address' value={buyerInfo
                    .address} onChange={onChange} type="text"  className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 '/>
                    <input name='city' onChange={onChange}  value={buyerInfo.city} type="text"  className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 '/>
                    <input name='name' onChange={onChange}  value={buyerInfo.name} type="text"  className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 '/>
                    <input name='email' onChange={onChange} value={buyerInfo.email} type="email"  className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 '/>
                </div>
                <div className='mt-4'>
                    <div className='flex my-3'>
                        <h2 className='grow font-bold text-gray-400'>
                            subtotal:
                        </h2>
                        <h3>
                            $123
                        </h3>
                    </div>
                    <div className='flex my-3'>
                        <h2 className='grow font-bold text-gray-400'>
                            Delivery:
                        </h2>
                        <h3>
                            $123
                        </h3>
                    </div>
                    <div className='flex my-3 border-t border-dashed border-emerald-500'>
                        <h2 className='grow font-bold text-gray-400'>
                            Total:
                        </h2>
                        <h3>
                            $123
                        </h3>
                    </div>
                </div>
        </Layout>
    )
}
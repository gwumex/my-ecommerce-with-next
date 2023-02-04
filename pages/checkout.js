import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { ProductsContext } from '../context/productContext'
export default function CheckOut() {
    const { selectedProducts } = useContext(ProductsContext)
    const [productsInfo, setProductsInfo] = useState([])
    useEffect(() => {
        async () => {
            const response = await fetch('/api/products?ids=' + selectedProducts.join(','))
            const data = await response.json()
        }
    }, [selectedProducts])

    return (
        <Layout>
            {selectedProducts.join(',')}
        </Layout>
    )
}
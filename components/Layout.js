import Footer from "./Footer"
import {useContext, useEffect, useState} from "react";
import { ProductsContext } from "../context/productContext";

export default function Layout({children}){

    const {setSelectedProducts} = useContext(ProductsContext);
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if (window.location.href.includes('success')){
            setSelectedProducts([])
            setSuccess(true);
        }
    }, [])
    return (
        <div className=" min-h-screen">
            <div className="p-5 pb-28 bg-gray-50">
                {success && (
                    <div className="mb-5 bg-green-400 text-white text-lg rounded-xl p-5">
                        Thanks for your order!
                    </div>
                )}
                {children}
            </div>
            <Footer/>
        </div>
    )
}
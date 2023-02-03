export default function Product(product) {
    return (
        <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
                <img src={product.picture} alt="" />
            </div>
            <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
            </div>
            <p className="text-sm mt-2">{product.description}
            </p>
            <div className="flex">
                <div className="text-2xl font-bold grow">${product.price}</div>
                <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl text"> + </button>
            </div>
        </div>
    );
}
export default function Home() {
  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <img src="/products/iphone.png" alt="" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Iphone 14 pro</h3>
            </div>
            <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti iusto nisi maxime similique
            </p>
            <div className="flex">
              <div className="text-2xl font-bold grow">$899</div>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl"> + </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// pages/client/products.jsx
import { Header } from "../../components/header"
import { ProductCards } from "../../components/productCards"

export function ClientProductsPage(){
    return(
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
            <Header/>

            <main className="w-full max-w-7xl px-6 py-8">
                <ProductCards/> 
            </main>
        </div>
    )
}

// pages/client/products.jsx
import { Header } from "../../components/header"
import { ProductCards } from "../../components/productCards" // Import ProductCards, not SearchProductCard

export function ClientProductsPage(){
    return(
        <div>
            <Header/>
            <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50">
                <ProductCards/> {/* This will now show all products correctly */}
            </div>
        </div>
    )
}
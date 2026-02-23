import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/loading"
import ImageSliderPage from "../../components/imageSlider"
import { addToCart, getCart } from "../../utils/cart"

export default function ProductOverviewPage(){


const params = useParams()
const productId = params.id
const [status, setStatus] = useState("loading") //loading, Sucess, Error
const [product, setProduct] = useState(null)
const navigate = useNavigate()

useEffect(
    () => {
        // Only fetch if productId exists
        if (productId) {
            axios.get("http://localhost:3000/api/product/"+productId)
                .then((response) => {
                    console.log(response.data)
                    setProduct(response.data)
                    setStatus("sucess")
                    // Log the clicked product data
                    console.log("Clicked product data:", response.data)
                })
                .catch((error) => {
                    console.log(error)
                    setStatus("error")
                    toast.error("Error fetching product")
                })
        } else {
            setStatus("error")
            toast.error("Product ID not found")
        }
    }
, [productId]) // Add productId to dependency array

// Log product data when it changes
useEffect(() => {
    if (product) {
        console.log("Product data loaded:", product)
    }
}, [product])

return(
<>
{status === "sucess" && (
  <div className="w-full h-screen bg-[#213448] flex items-center justify-center">
    
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl flex overflow-hidden">
      
      {/*IMAGE */}
      <div className="w-1/2 bg-[#F8FAFC] p-6 flex items-center justify-center">
        <ImageSliderPage images={product.imgUrls} />
      </div>

      {/*DETAILS */}
      <div className="w-1/2 p-10 flex flex-col justify-between">
        
        <div>
          {/* Product Name */}
          <h1 className="text-4xl font-bold text-[#213448] mb-2">
            {product.productName}
          </h1>

          {/* Alternative Names */}
          <h2 className="text-gray-500 mb-2">
            {product.altNames.join(" / ")}
          </h2>

          {/* Product ID */}
          <p className="text-sm text-gray-400 mb-6">
            Product ID: {product.productId}
          </p>

          {/* Divider */}
          <div className="border-b border-gray-200 mb-6"></div>

          {/* Pricing Section */}
          <div className="mb-6">
            {product.labeledPrice > product.sellingPrice ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 line-through text-lg">
                  LKR {product.labeledPrice.toFixed(2)}
                </span>
                <span className="text-3xl font-bold text-[#547792]">
                  LKR {product.sellingPrice.toFixed(2)}
                </span>
                <span className="bg-[#94B4C1] text-[#213448] text-xs px-3 py-1 rounded-full font-semibold">
                  SALE
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-accent">
                LKR {product.sellingPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4">
          <button className="flex-1 h-12 bg-accent text-white rounded-xl font-semibold hover:bg-[#94B4C1] hover:text-[#213448] transition-all duration-300 shadow-md"
          onClick={()=>{
            console.log("Old cart")
            console.log(getCart())
            addToCart(product, 1)
            navigate("/cart")
            console.log("New cart")
            console.log(getCart()) }}
            

            >
            Add to Cart
          </button>

          <button 

            onClick={() => {
                  navigate("/checkout", {
                    state: {
                      cart: [
                        {
                          productId: product.productId,
                          productName: product.productName,
                          imgUrls: [product.imgUrls?.[0]],
                          sellingPrice: product.sellingPrice,
                          labeledPrice: product.labeledPrice,
                          qty: 1,
                        },
                      ],
                    },
                  });
                }}
          
          
            className="flex-1 h-12 border-2 border-[#547792] text-[#547792] rounded-xl font-semibold hover:bg-[#547792] hover:text-white transition-all duration-300">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  </div>
)}

    {status == "loading" && <Loading/>}
</>
)
}
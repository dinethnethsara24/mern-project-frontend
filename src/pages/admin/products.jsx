import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { FcEditImage, FcFullTrash } from "react-icons/fc"
import toast from "react-hot-toast"

export function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const navigate = useNavigate() 

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if(isLoading == true){
            axios.get("http://localhost:3000/api/product")
                .then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => { 
                    console.log(err);
                });                    
        }

    }, [isLoading]);

    function deleteProduct(productId){

        const token = localStorage.getItem("token")

        if(token == null){
            toast.error("User Not authorized to access this function")
            return;

        }

        axios.delete("http://localhost:3000/api/product/"+productId , {
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then(() => {
            toast.success("product deleted successfully")
            setIsLoading(true)
            
        }).catch((e) => {
            toast.error(e.message.data.message)
        })
    }


    return(
        <div className = "w-full h-full max-h-full overflow-y-scroll relative">
            <Link to="/admin/products/add" className="absolute bottom-4 right-4 w-32 h-12 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 cursor-pointer flex justify-center items-center">Add Product</Link>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th>Product ID</th> 
                        <th>Product Image</th>
                        <th>Product Name</th>                       
                        <th>Labelled Price</th>
                        <th>Discounted Price</th>
                        <th>Stock</th> 
                        <th>Availability</th>
                        <th>Actions</th>   
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (item,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td><img src={item.imgUrls[0]} className="w-20 h-20 object-cover mx-auto"/></td>
                                        <td>{item.productName}</td>                                        
                                        <td>{item.labeledPrice}</td>
                                        <td>{item.sellingPrice}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                                        <td>
                                            <div className="flex justify-center items-center w-full gap-4">
                                                <FcFullTrash 
                                                        onClick={() => deleteProduct(item.productId)}
                                                        className="text-[20px] cursor-pointer transition-transform duration-200 hover:scale-125"/>
                                                <FcEditImage 
                                                        onClick={()=>{
                                                            navigate("/admin/products/edit-products", {
                                                                state : item
                                                            })
                                                        }}
                                                        className="text-[20px] cursor-pointer transition-transform duration-200 hover:scale-125"/>
                                            </div>
                                        </td>
                                    </tr>

                                )
                            }
                        )
                    }

                </tbody>
            </table> 
        </div>
    )
}

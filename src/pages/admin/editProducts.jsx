import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export function EditProductsPage(){

    const location = useLocation()
    const [productId, setProductId] = useState(location.state.productId);
    const [productName, setProductName] = useState(location.state.productName);
    const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
    const [sellingPrice, setSellingPrice] = useState(location.state.sellingPrice);
    const [stock, setStock] = useState(location.state.stock);
    // const [isAvailable, setIsAvailable] = useState(true);
    const [imgUrls, setImgUrls] = useState([]);
    const [altNames, setAltNames] = useState(location.state.altNames.join(","));
    const navigate = useNavigate()

    

    async function EditProducts(e){

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You are not authorized to perform this action");
            toast.error("Please login as admin to continue");
            return;
        }

        let finalImgUrls = location.state.imgUrls;  

        const promisesArray = [];

        // Only upload new images if user selected them
        if(imgUrls.length > 0){
            for(let i=0;i<imgUrls.length;i++){
                promisesArray.push(mediaUpload(imgUrls[i]));
            }
        }
        try{
            if(promisesArray.length > 0){
                finalImgUrls = await Promise.all(promisesArray);
            }

            const altNamesArray = altNames.split(",")

            const product = {
                productId: productId,
                productName: productName,
                labeledPrice: Number(labeledPrice),
                sellingPrice: Number(sellingPrice),
                stock: Number(stock),
                // isAvailable: Number(stock),
                imgUrls: finalImgUrls,
                altNames: altNamesArray 
            }

            axios.put(`http://localhost:3000/api/product/${productId}`, product, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                toast.success("Product updated successfully");
                navigate("/admin/products")

            }).catch((error) => {
                console.log("Error response:", error.response);
                toast.error(error.response?.data?.message || "Failed to update product");
            })



        } catch(e){
            toast.error("Image upload failed. Please try again.");
            return;    
        }
    }

    return(

        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-[30px] font-bold">Edit Product</h1>
           <input 
                type="text" 
                disabled
                placeholder="Product ID"
                value={productId}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setProductId(e.target.value)} />

            <input 
                type="text" 
                placeholder="Product Name"
                value={productName}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setProductName(e.target.value)} />

            <input 
                type="number" 
                placeholder="Labeled Price"
                value={labeledPrice}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setLabeledPrice(e.target.value)} />

            <input 
                type="number" 
                placeholder="Selling Price"
                value={sellingPrice}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setSellingPrice(e.target.value)} />

            <input 
                type="number" 
                placeholder="Stock"
                value={stock}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setStock(e.target.value)} />

            <input
                type="file"
                placeholder="Images"
                multiple className="input input-bordered w-full max-w-x5"
                onChange={(e) => setImgUrls(e.target.files)} />

            <input
                type="text"
                placeholder="Alt Names (comma separated)"
                value={altNames}
                className="input input-bordered w-full max-w-x5"
                onChange={(e) => setAltNames(e.target.value)} />

            <div className="w-full flex justify-center items-center mt-4">
                <button className="ml-4 text-white font-bold rounded-lg px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer" onClick={EditProducts}>Edit Product</button>
                <Link to="/admin/products" className="ml-4 text-white font-bold rounded-lg px-4 py-2 bg-red-500 hover:bg-red-600">Cancel</Link>
            </div>               
        </div>
    )
}
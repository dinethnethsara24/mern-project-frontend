import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export function AddProductsPage(){

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [labeledPrice, setLabeledPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [stock, setStock] = useState(0);
    // const [isAvailable, setIsAvailable] = useState(true);
    const [imgUrls, setImgUrls] = useState([]);
    const [altNames, setAltNames] = useState([]);
    const navigate = useNavigate("")

    async function AddProducts(e){

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You are not authorized to perform this action");
            toast.error("Please login as admin to continue");
            return;
        }

        if(imgUrls.length<=0){
            toast.error("Please upload at least one image");
            return;
        }

        const promisesArray = [];

        for(let i=0;i<imgUrls.length;i++){
            promisesArray[i] = mediaUpload(imgUrls[i]);
        }
        try{
            const imgUrlsUploaded = await Promise.all(promisesArray)
            console.log(imgUrlsUploaded);

            const altNamesArray = altNames.split(",")

            const product = {
                productId: productId,
                productName: productName,
                labeledPrice: Number(labeledPrice),
                sellingPrice: Number(sellingPrice),
                stock: Number(stock),
                // isAvailable: Number(stock),
                imgUrls: imgUrlsUploaded,
                altNames: altNamesArray
            }

            axios.post("http://localhost:3000/api/product/add", product, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                toast.success("Product added successfully");
                navigate("/admin/products")

            }).catch((error) => {
                toast.error("Failed to add product");
            })



        } catch(e){
            toast.error("Image upload failed. Please try again.");
            return;    
        }
    }

    return(

        <div className="w-full h-full flex flex-col gap-4 p-4">
           <input 
                type="text" 
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
                <button className="ml-4 text-white font-bold rounded-lg px-4 py-2 bg-green-500 hover:bg-green-600" onClick={AddProducts}>Add Product</button>
                <Link to="/admin/products" className="ml-4 text-white font-bold rounded-lg px-4 py-2 bg-red-500 hover:bg-red-600">Cancel</Link>
            </div>               
        </div>
    )
}
import { useState, useEffect } from "react"

import axios from "axios"


export function AdminProductsPage(){

    const [products, setProducts] = useState([]) 

    useEffect(() => {
    axios.get("http://localhost:3000/api/product")
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);


    return(
        <div className = "w-full h-full max-h-full overflow-y-scroll">
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Labelled Price</th>
                        <th>Discounted Price</th>
                        <th>Stock</th> 
                        <th>Availability</th>   
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (item,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.productName}</td>
                                        <td><img src={item.imgUrls[0]} className="w-20 h-20 object-cover mx-auto"/></td>
                                        <td>{item.labeledPrice}</td>
                                        <td>{item.sellingPrice}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.isAvailable ? "Available" : "Not Available"}</td>
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
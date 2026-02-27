// pages/client/searchProduct.jsx
import { Header } from "../../components/header"
import { SearchProductCard } from "../../components/searchProductCard"
import { useState, useEffect } from "react"
import axios from "axios"
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true); // For initial all products load
    const [query, setQuery] = useState("");

    // Fetch all products when component mounts (empty search)
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        setIsInitialLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/product");
            // Filter only available products and remove duplicates
            const availableProducts = response.data.filter(product => product.isAvailable);
            const uniqueProducts = availableProducts.filter((product, index, self) =>
                index === self.findIndex((p) => p.productId === product.productId)
            );
            setProducts(uniqueProducts);
        } catch (error) {
            toast.error("Failed to load products");
            console.error(error);
        } finally {
            setIsInitialLoading(false);
        }
    };

    const searchProducts = async (searchQuery) => {
        if (searchQuery.length === 0) {
            // If search is empty, fetch all products again
            fetchAllProducts();
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/product/search/${searchQuery}`);
            // Filter available products and remove duplicates
            const availableProducts = response.data.filter(product => product.isAvailable);
            const uniqueProducts = availableProducts.filter((product, index, self) =>
                index === self.findIndex((p) => p.productId === product.productId)
            );
            setProducts(uniqueProducts);
        } catch (error) {
            toast.error("Search failed. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    let timeoutId;
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            searchProducts(value);
        }, 500);
    };

    // Show initial loading state
    if (isInitialLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center p-4">
                {/* <Header/> */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={query}
                    onChange={handleSearch}
                />
                <div className="w-full flex justify-center items-center min-h-[400px]">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            {/* <Header/> */}
            <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                value={query}
                onChange={handleSearch}
            />
            
            {/* Show search result count */}
            {query.length > 0 && (
                <div className="w-full text-left mb-2 text-gray-600">
                    Found {products.length} product{products.length !== 1 ? 's' : ''} for "{query}"
                </div>
            )}

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {isLoading ? (
                    <div className="col-span-full flex justify-center items-center min-h-[400px]">
                        <Loading />
                    </div>
                ) : (
                    <>
                        {products.length === 0 ? (
                            <div className="col-span-full text-center p-8">
                                <h1 className="text-2xl text-secondary font-semibold">
                                    {query.length > 0 
                                        ? `No products found for "${query}"` 
                                        : "No products available"}
                                </h1>
                            </div>
                        ) : (
                            products.map((product) => (
                                <SearchProductCard 
                                    key={product._id || product.productId} 
                                    product={product} 
                                />
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
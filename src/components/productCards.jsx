// components/productCards.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye } from "lucide-react"; // Import Eye for the Apple-style action button

export function ProductCards() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="font-semibold mt-3">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-center">
          <h2 className="font-bold text-lg">Error loading products</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-50">
      {products.length === 0 ? (
        <div className="col-span-full text-center p-8 text-gray-500">
          No products available
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.productId}
            className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
          >

            <Link to={`/overview/${product.productId}`} className="flex flex-col items-center">
              {/* Image Container */}
              <div className="h-48 w-full flex items-center justify-center mb-6 mt-2">
                {product.imgUrls && product.imgUrls.length > 0 ? (
                  <img
                    src={product.imgUrls[0]}
                    alt={product.productName}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>

              {/* Product Info*/}
              <div className="text-center w-full space-y-1">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  Apple
                </p>
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.productName}
                </h3>
                
                <div className="flex flex-col items-center">
                   <p className="text-sm text-gray-600">
                    From <span className="font-bold text-gray-900">Rs.{product.sellingPrice}</span>
                  </p>
                  {product.labeledPrice > product.sellingPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      Rs.{product.labeledPrice}
                    </p>
                  )}
                </div>
              </div>
            </Link>

            {/* Availability and Buy Button */}
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  product.isAvailable && product.stock > 0
                    ? "bg-gray-50 text-gray-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <button
                disabled={!product.isAvailable || product.stock <= 0}
                className="px-4 py-1.5 text-xs font-bold rounded-full text-gray-900 border border-2 border-gray-800 hover:bg-black hover:text-white disabled:bg-gray-300 transition-all transform active:scale-95"
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      cart: [{
                        productId: product.productId,
                        productName: product.productName,
                        imgUrls: [product.imgUrls?.[0]],
                        sellingPrice: product.sellingPrice,
                        labeledPrice: product.labeledPrice,
                        qty: 1,
                      }],
                    },
                  });
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
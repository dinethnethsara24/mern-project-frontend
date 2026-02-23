import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function ProductCards() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Products
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

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="font-semibold mt-3">Loading Products...</h2>
      </div>
    );
  }

  // Error State
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center p-8">
          No products available
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.productId}
            className="border rounded-md shadow-sm hover:shadow-lg transition p-3 bg-white"
          >
            {/* Product Image + Name (Clickable to Overview) */}
            <Link to={`/overview/${product.productId}`}>
              {product.imgUrls && product.imgUrls.length > 0 && (
                <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
                  <img
                    src={product.imgUrls[0]}
                    alt={product.productName}
                    className="h-full w-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              )}

              <div className="mt-3 text-center">
                <h3 className="font-semibold text-sm truncate hover:text-blue-600">
                  {product.productName}
                </h3>
              </div>
            </Link>

            {/* Prices */}
            <div className="text-center mt-2">
              <p className="text-xs text-gray-400 line-through">
                Rs.{product.labeledPrice}
              </p>

              <p className="font-bold text-md text-blue-600">
                Rs.{product.sellingPrice}
              </p>
            </div>

            {/* Stock + Button */}
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  product.isAvailable && product.stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.isAvailable && product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </span>

              <button
                disabled={!product.isAvailable || product.stock <= 0}
                className="px-3 py-1 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition hover:pointer"
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
              >
                {product.isAvailable && product.stock > 0
                  ? "Buy Now"
                  : "Unavailable"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
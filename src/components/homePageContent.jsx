import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductCards } from "./productCards";
import Loading from "./loading";
import { ChevronRight } from "lucide-react";

export function HomePageContent() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const categoryConfig = {
		M: { name: "iPhone", color: "from-blue-500 to-blue-600", icon: "📱" },
		W: { name: "Apple Watch", color: "from-purple-500 to-purple-600", icon: "⌚" },
		H: { name: "AirPods", color: "from-pink-500 to-pink-600", icon: "🎧" },
		P: { name: "Mac", color: "from-gray-600 to-gray-700", icon: "💻" },
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get("http://localhost:3000/api/product");
				setProducts(res.data);
				setLoading(false);
			} catch (err) {
				setError(err.message || "Failed to load products");
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const categorizeProducts = (productsList) => {
		const categorized = {
			M: [],
			W: [],
			H: [],
			P: [],
		};

		productsList.forEach((product) => {
			const prefix = product._id?.charAt(0)?.toUpperCase();
			if (prefix && categorized[prefix]) {
				categorized[prefix].push(product);
			}
		});

		return categorized;
	};

	const getCategoryProducts = (category) => {
		const categorized = categorizeProducts(products);
		return categorized[category] || [];
	};

	const getFeaturedProducts = () => {
		return products.slice(0, 4);
	};

	if (loading) {
		return <Loading />;
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
		<div className="w-full">
			{/* Hero Banner */}
			<section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold mb-4">
						Welcome to Apple Store
					</h1>
					<p className="text-xl text-gray-300 mb-8 max-w-2xl">
						Discover the latest Apple products with premium quality and exclusive deals.
					</p>
					<Link
						to="/products"
						className="inline-block bg-white hover:bg-blue-700 text-gray-900 font-bold py-3 px-8 rounded-lg transition"
					>
						Shop Now
					</Link>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
						<Link
							to="/products"
							className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
						>
							View All <ChevronRight size={20} />
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{getFeaturedProducts().map((product) => (
							<div
								key={product.productId}
								className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
							>
								<Link to={`/overview/${product._id}`}>
									<img
										src={product.imgUrls[0]}
										alt={product.altNames[0]}
										className="w-full h-48 object-cover hover:scale-105 transition"
									/>
									<div className="p-4">
										<h3 className="font-bold text-lg text-gray-900 line-clamp-1">
											{product.productName}
										</h3>
										<p className="text-secondary font-bold text-lg mt-2">
											{product.sellingPrice} LKR
										</p>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Products by Category */}
			{Object.entries(categoryConfig).map(([key, category]) => {
				const categoryProducts = getCategoryProducts(key);
				if (categoryProducts.length === 0) return null;

				return (
					<section key={key} id={key.toLowerCase()} className="py-16 px-4 bg-white border-t">
						<div className="max-w-7xl mx-auto">
							<div className="flex justify-between items-center mb-8">
								<div className="flex items-center gap-3">
									<span className="text-4xl">{category.icon}</span>
									<h2 className="text-4xl font-bold text-gray-900">
										{category.name}
									</h2>
								</div>
								<Link
									to="/products"
									className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
								>
									View All <ChevronRight size={20} />
								</Link>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
								{categoryProducts.slice(0, 4).map((product) => (
									<div
										key={product.productId}
										className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
									>
										<Link to={`/overview/${product.productId}`}>
											<img
												src={product.imgUrls[0]}
												alt={product.altNames[0]}
												className="w-full h-48 object-cover hover:scale-105 transition"
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg text-gray-900 line-clamp-1">
													{product.productName}
												</h3>
												<p className="text-blue-600 font-bold text-lg mt-2">
													${product.sellingPrice}
												</p>
											</div>
										</Link>
									</div>
								))}
							</div>

							<div className={`bg-gradient-to-r ${category.color} text-white rounded-lg p-8 flex justify-between items-center`}>
								<div>
									<h3 className="text-2xl font-bold mb-2">{category.name}</h3>
									<p className="text-white text-opacity-90">
										Explore our complete {category.name.toLowerCase()} collection
									</p>
								</div>
								<Link
									to="/products"
									className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition"
								>
									Shop {category.name}
								</Link>
							</div>
						</div>
					</section>
				);
			})}

			{/* Benefits Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="text-5xl mb-4">🚚</div>
							<h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
							<p className="text-gray-600">Free shipping on orders over $50</p>
						</div>
						<div className="text-center">
							<div className="text-5xl mb-4">🛡️</div>
							<h3 className="text-xl font-bold mb-2">Secure Payment</h3>
							<p className="text-gray-600">Your payment information is safe with us</p>
						</div>
						<div className="text-center">
							<div className="text-5xl mb-4">↩️</div>
							<h3 className="text-xl font-bold mb-2">Easy Returns</h3>
							<p className="text-gray-600">30-day money-back guarantee</p>
						</div>
						<div className="text-center">
							<div className="text-5xl mb-4">💬</div>
							<h3 className="text-xl font-bold mb-2">24/7 Support</h3>
							<p className="text-gray-600">Dedicated customer support team</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

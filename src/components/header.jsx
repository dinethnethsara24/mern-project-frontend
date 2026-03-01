import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export function Header() {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full h-[70px] bg-gray-900 shadow-md border-b border-white/10 flex items-center px-10 font-poppins">            <div className="flex-1 flex justify-start">
            <img
                onClick={() => navigate("/")}
                src="/logo.jpg"
                alt="Logo"
                className="w-[50px] h-[50px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
        </div>
            <nav className="flex items-center gap-8">
                <Link to="/" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/products" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Products
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/login" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Login
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/register" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Sign up
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </nav>

            <div className="flex-1 flex justify-end items-center gap-5">
                <Link to="/search">
                    <FaSearch className="text-[20px] text-white hover:scale-110 transition-all" />
                </Link>
                <Link to="/cart">
                    <FaShoppingCart className="text-[22px] text-white hover:scale-110 transition-all" />
                </Link>
            </div>
        </header>
    );
}
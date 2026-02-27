import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";



export function Header() {
    const navigate = useNavigate();

    return (

        <header className="w-full h-[70px] shadow-2xl flex">
            <img
                onClick={() => {
                    navigate("/")
                }
                }
                src="/logo.jpg" alt="Logo" className="w-[50px] h-[50px] object-cover" />
            <div className="w-[calc(100%-50px)] h-full bg-accent flex justify-center items-center font-bold gap-5 shadow-2xl font-poppins text-gray-700">
                <Link
                    to="/"
                    className="relative text-gray-700 hover:text-black font-medium group"
                >
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                to="/products" className="relative text-gray-700 hover:text-black font-medium group">
                  Product
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/login" className="relative text-gray-700 hover:text-black font-medium group">
                  Login
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/register" className="relative text-gray-700 hover:text-black font-medium group">
                  Sign up
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </div>

            <div className="w-[50px] h-full bg-accent flex flex-row justify-center items-center">
                <Link to="/search" >
                    <FaSearch className="text-[20px] font-bold  hover:scale-110 transition-all" />
                </Link>
                <Link to="/cart" className="text-[20px] font-bold mx-2 hover:scale-110 transition-all">
                    <FaShoppingCart />
                </Link>
            </div>

        </header>
    )
}
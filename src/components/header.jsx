import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


export function Header(){
    const navigate = useNavigate();

    return(

        <header className="w-full h-[70px] shadow-2xl flex">
            <img 
                onClick={()=>{
                    navigate("/")
                }
                }
                src="/logo.jpg" alt="Logo" className="w-[50px] h-[50px] object-cover"/>
            <div className="w-[calc(100%-50px)] h-full bg-accent flex justify-center items-center font-bold gap-5 shadow-2xl">
                <Link to="/">Home</Link>
                <Link to="/products">Product</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign up</Link>
            </div>

            <div className="w-[50px] h-full bg-accent flex justify-center items-center">
                <Link to="/cart" className="text-[20px] font-bold mx-2 hover:scale-110 transition-all">
                    <FaShoppingCart />
                </Link>            
            </div>

        </header>
    )
}
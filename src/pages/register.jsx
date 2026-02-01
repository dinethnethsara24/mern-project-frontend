import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {


        if(!firstName || !lastName || !email || !password){

            toast.error("Please fill all the required fields")
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/user/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            toast.success("Registration successful");

            navigate("/login");

        } catch (e) {
            toast.error(e.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="w-screen h-screen bg-[url('/login.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[25px] shadow-xl justify-center items-center flex flex-col">

                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="First Name"
                    className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3"
                />

                <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Last Name"
                    className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3"
                />

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    type="password"
                    className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3"
                />

                <button
                    onClick={handleRegister}
                    className="w-[300px] h-[50px] bg-blue-500 text-white font-bold rounded-lg my-[20px] cursor-pointer hover:bg-blue-600"
                >
                    Register
                </button>

            </div>
        </div>
    );
}

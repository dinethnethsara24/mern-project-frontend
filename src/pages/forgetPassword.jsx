import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ForgetPasswordPage() {

    const [otpSent, setotp] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function sendOtp() {
        axios.post("http://localhost:3000/api/user/send-otp", {
            email: email
        })
            .then((response) => {
                setotp(true);
                toast.success("OTP sent to your email")
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
                toast.error("Error sending OTP or User not found")
            })
    }


    function verifyOtp() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const otpInNUmberFormat = parseInt(otp, 10);

        axios.post("http://localhost:3000/api/user/reset-password", {
            email: email,
            otp: otpInNUmberFormat,
            newPassword: newPassword
        })
            .then((response) => {
                toast.success("Password reset successfully")
                console.log(response.data)
                //redirect to login page
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error(error)
                toast.error("Invalid OTP or error resetting password")
            })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            {
                otpSent ?
                    <div className="w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center">
                        <input placeholder="Enter OTP" className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <input placeholder="Enter new password" type="password" className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <input placeholder="Confirm new password" type="password" className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button onClick={verifyOtp} className="w-[300px] h-[50px] bg-blue-500 text-white font-bold rounded-lg my-[20px] cursor-pointer hover:bg-blue-600">Reset Password</button>
                        <button onClick={() => setotp(false)} className="w-[300px] h-[50px] bg-gray-500 text-white font-bold rounded-lg my-[20px] cursor-pointer hover:bg-gray-600">Resend OTP</button>
                    </div> :

                    <div className="w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center">
                        <input placeholder="Enter your email" type="email" className="w-[300px] h-[50px] border border-gray-300 rounded-lg my-[10px] px-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={sendOtp} className="w-[300px] h-[50px] bg-blue-500 text-white font-bold rounded-lg my-[20px] cursor-pointer hover:bg-blue-600">Send OTP</button>
                    </div>
            }

        </div>
    )
}
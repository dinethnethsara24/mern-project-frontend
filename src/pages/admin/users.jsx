import { useState, useEffect } from "react";
import axios from "axios";

export function AdminUsersPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/user")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll">
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Profile Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Blocked</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((item, index) => {
                            return (
                                <tr key={index}>
                                    
                                    <td>{item._id}</td>
                                    <td>
                                        <img
                                            src={item.img}
                                            className="w-16 h-16 rounded-full object-cover mx-auto"
                                        />
                                    </td>                                    
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td className="font-semibold">
                                        {item.role}
                                    </td>
                                    <td className={item.isBlocked ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                                        {item.isBlocked ? "Blocked" : "Active"}
                                    </td>

                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

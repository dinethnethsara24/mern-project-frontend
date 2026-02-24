import { Link, Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import { AdminProductsPage } from "./admin/products";
import { AddProductsPage } from "./admin/addProducts";
import { AdminUsersPage } from "./admin/users";
import { EditProductsPage } from "./admin/editProducts";
import { FaBoxOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AdminOrdersPage } from "./admin/orders";


export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;

  function getClass(name) {
    return `flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300
    ${
      path.includes(name)
        ? "bg-[#547792] text-white shadow-lg"
        : "text-gray-600 hover:bg-[#547792]/10 hover:text-[#547792]-600"
    }`;
  }

  return (
    <div className="w-full h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="h-full w-[260px] bg-white shadow-lg p-6 flex flex-col">
        
        <h1 className="text-2xl font-bold text-black-600 mb-8">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-3">
          <Link className={getClass("/products")} to="/admin/products">
            <FaBoxOpen /> Products
          </Link>

          <Link className={getClass("/orders")} to="/admin/orders">
            <FaShoppingCart /> Orders
          </Link>

          <Link className={getClass("/users")} to="/admin/users">
            <FaUsers /> Users
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Top Header */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h2>

          <div className="text-sm text-gray-500">
            Welcome back, Admin
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="bg-white p-6 rounded-2xl shadow-md min-h-[70vh]">
          <Routes>
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/products/add" element={<AddProductsPage />} />
            <Route path="/products/edit-products" element={<EditProductsPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}
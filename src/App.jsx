import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import AdminPage from './pages/adminPage.jsx'
// import AdminProductsPage from './pages/admin/adminProducts.jsx'
import { TestPage } from './pages/testPage.jsx'
// import Header from './components/header.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        {/* <Route path="/admin/products" element={<AdminProductsPage/>} /> */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
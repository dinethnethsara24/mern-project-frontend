import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import AdminPage from './pages/adminPage.jsx'
// import AdminProductsPage from './pages/admin/products.jsx'
import { TestPage } from './pages/testPage.jsx'
// import Header from './components/header.jsx'
import { Toaster } from 'react-hot-toast'
import { HomePage } from './pages/HomePage.jsx'
import { ClientProductsPage } from './pages/client/products.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/forgetPassword.jsx'

function App() {
  return (
    <GoogleOAuthProvider clientId="975133249214-hb88ai8m5cjhe9gimnf3gbf1p2rv71an.apps.googleusercontent.com">
      <BrowserRouter>
        <div>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ClientProductsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />

            <Route path="/test" element={<TestPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}

export default App
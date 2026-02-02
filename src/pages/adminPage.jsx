import { Link, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { AdminProductsPage } from './admin/adminProducts';
import { AddProductsPage } from './admin/addProducts';
import { AdminUsersPage } from './admin/adminUsers';


export default function AdminPage() {

    return(

        <div className='w-full h-screen flex '>
            <div className='h-full w-[300px] flex flex-col '>
                <Link to='/admin/products'>Products</Link>
                <Link to='/admin/orders'>Orders</Link>
                <Link to='/admin/users'>Users</Link>
            </div>
                <div className='h-full w-[calc(100%-300px)]'>
                    <Routes>
                        <Route path='/products' element={<AdminProductsPage/>}/>
                        <Route path='/products/add' element={<AddProductsPage/>}/>
                        <Route path='/orders' element={<h1>orders</h1>}/>
                        <Route path='/users' element={<AdminUsersPage/>}/>
                    </Routes>
                    
                </div> 
        </div>
    )
}
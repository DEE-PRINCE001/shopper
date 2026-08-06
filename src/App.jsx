import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Categories from './pages/admin/CategoryPage'
import Orders from './pages/admin/Orders'
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import ResetLinkSent from './pages/auth/ResetLinkSent'
import CDashboard from './pages/customers/CDashboard'
import CustomerLayout from './layouts/CustomerLayout'
import CartPage from './pages/customers/CartPage'
import Feed from './pages/customers/Feed'
import NewArrivals from './pages/customers/NewArrivals'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <div className='font-inter'>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>


        {/* AuthPages */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path="login" element={<Login />} />

          <Route
            path="register"
            element={<Register />}
          />

          <Route
            path="forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="reset-link-sent"
            element={<ResetLinkSent />}
          />
        </Route>

        {/* AdminPages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="categories"
            element={<Categories />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />
        </Route>

        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CDashboard />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='feeds' element={<Feed />} />
          <Route path='new-arrivals' element={<NewArrivals />} />
          <Route path='contact' />
        </Route>
      </Routes>
    </div>
  )
}

export default App
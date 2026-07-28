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


const App = () => {
  return (
    <div className='font-inter'>
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

        <Route path="/" element={<CDashboard/>} />
      </Routes>
    </div>
  )
}

export default App
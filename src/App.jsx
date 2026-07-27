import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Ratings from './components/Ratings'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProductSection from './components/ProductSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Cart from './components/Cart'
// import Testimony from './components/Testimony'
import furnitures from '/images/furniture.png';
import OrderSummary from './components/OrderSummary'
import CartSection from './components/CartSection'
import Dashboard from './pages/admin/Dashboard'


const App = () => {
  return (

    <BrowserRouter>
      <div className='font-inter'>
        <Dashboard/>
        {/* <Navbar />
        <HeroSection />
        <CartSection />
        <ProductSection name='new arrivals' border />
        <ProductSection name='top selling' />
        <TestimonialsSection />
        <ContactSection />
        <Footer /> */}
        {/* <Product img={"/images/fashion.png"} discount={20}/> */}


      </div>
    </BrowserRouter>
  )
}

export default App
import React from 'react'

import Ratings from '../../components/Ratings'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import ProductSection from '../../components/ProductSection'
import TestimonialsSection from '../../components/TestimonialsSection'
import ContactSection from '../../components/ContactSection'
import Footer from '../../components/Footer'
import Cart from '../../components/Cart'
// import Testimony from './components/Testimony'
import furnitures from '/images/furniture.png';
import OrderSummary from '../../components/OrderSummary'
import CartSection from '../../components/CartSection'

const CDashboard = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CartSection />
            <ProductSection name='new arrivals' border />
            <ProductSection name='top selling' />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
        </div>
    )
}

export default CDashboard
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Ratings from './components/Ratings'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProductSection from './components/ProductSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
// import Testimony from './components/Testimony'

const App = () => {
  return (

    <BrowserRouter>
    <div className='font-lupio'>
      <Navbar/>
      <HeroSection/>
      <ProductSection name='new arrivals' border />
      <ProductSection name='top selling' />
      <TestimonialsSection />
      <ContactSection />
      <Footer/>
      {/* <Product img={"/images/fashion.png"} discount={20}/> */}

     
    </div>
    </BrowserRouter>
  )
}

export default App
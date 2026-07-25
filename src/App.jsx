import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Ratings from './components/Ratings'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Product from './components/Product'

const App = () => {
  return (

    <BrowserRouter>
    <div className='font-lupio'>
      <Navbar/>
      <HeroSection/>
      <Product img={"/images/fashion.png"} discount={20}/>

      <div className='font-lupio font-bold w-full h-80 bg-secondary'>App</div>
      <Ratings rating={3.5}/>
    </div>
    </BrowserRouter>
  )
}

export default App
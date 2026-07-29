import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'


const CustomerLayout = () => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Navbar />
        <Outlet/>
        <ContactSection/>
        <Footer />
    </div>
  )
}

export default CustomerLayout
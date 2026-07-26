import React from 'react'
import Testimony from './Testimony'

const TestimonialsSection = () => {
  return (
    <div className='flex flex-col bg-secondary p-5 rounded-xl space-y-5 md:space-y-7 flex-1 mx-5 md:mx-10 xl:mx-15'>
        <div className='text-primary text-3xl font-extrabold text-center md:text-left'>OUR HAPPY CUSTOMERS</div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5'>
            <Testimony/>
            <Testimony/>
            <Testimony/>
        </div>
    </div>
  )
}

export default TestimonialsSection
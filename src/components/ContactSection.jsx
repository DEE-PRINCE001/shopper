import React from 'react'

const ContactSection = () => {
  return (
    <div className='flex flex-col space-y-5 md:flex-row md:justify-between py-5 px-7 md:px-10 bg-primary mx-5 md:mx-10 xl:mx-15 rounded-xl mt-8'>
        <div className='text-white text-3xl font-extrabold md:w-[40%]'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</div>
        <div className='w-full md:w-[40%] justify-self-right flex flex-col space-y-3'>
            <input type="text" placeholder='Enter your email address' className='py-2 px-5 rounded-full w-full text-sm bg-white text-center outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-300 text-black' />
            <button className='w-full bg-white text-sm text-center text-primary py-2 px-3 rounded-full hover:bg-gray-300 cursor-pointer'>Subscribe to Newsletter</button>

        </div>

    </div>
  )
}

export default ContactSection
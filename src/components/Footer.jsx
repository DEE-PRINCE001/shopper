import React from 'react'
import { RiFacebookCircleFill, RiGithubFill , RiInstagramFill, RiTwitterFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <div className='flex flex-col space-y-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 border-b border-gray-300'>
            <div className='flex flex-col space-y-5'>
                <h1 className='text-primary font-extrabold text-2xl'>SHOPPER</h1>
                <p className='text-gray-500 font-sans font-normal text-sm'>We have products that suits your need and which you will be proud to use in any categories.</p>
                <div className='flex space-x-3'>
                    <RiTwitterFill/>
                    <RiFacebookCircleFill/>
                    <RiInstagramFill/>
                    <RiGithubFill/>

                </div>

            </div>
        </div>

        <div className='text-gray-500 text-sm font-sans'>
            Shopper (C) 2026 @ Deeprince. All Rights Reserved 
        </div>
    </div>
  )
}

export default Footer
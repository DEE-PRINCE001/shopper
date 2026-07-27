import React from 'react'
import { RiFacebookCircleFill, RiGithubFill , RiInstagramFill, RiTwitterFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col space-y-3 mx-5 md:mx-10 xl:mx-15 my-8'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7 lg:gap-10 xl:gap-15 border-b border-gray-300 pb-5'>
            <div className='flex flex-col space-y-3 col-span-2 md:col-span-1'>
                <h1 className='text-primary font-extrabold text-2xl leading-none'>SHOPPER</h1>
                <p className='text-gray-500 font-sans font-normal text-sm'>We have products that suits your need and which you will be proud to use in any categories.</p>
                <div className='flex space-x-3'>
                    <RiTwitterFill size={20}/>
                    <RiFacebookCircleFill size={20}/>
                    <RiInstagramFill size={20}/>
                    <RiGithubFill size={20}/>
                </div>
            </div>

            <div className='flex flex-col space-y-4'>
                <h4 className='text-primary font-normal text-[14px] tracking-[4px]'>COMPANY</h4>
                <div className='flex flex-col space-y-2 font-light text-gray-500 text-[14px]'>
                    <Link className='hover:text-primary'>About</Link>
                    <Link className='hover:text-primary'>Features</Link>
                    <Link className='hover:text-primary'>Works</Link>
                    <Link className='hover:text-primary'>Career</Link>
                </div>

            </div>
            <div className='flex flex-col space-y-4'>
                <h4 className='text-primary font-normal text-[14px] tracking-[4px]'>HELP</h4>
                <div className='flex flex-col space-y-2 font-light text-gray-500 text-[14px]'>
                    <Link className='hover:text-primary'>Customer Support</Link>
                    <Link className='hover:text-primary'>Delivery Details</Link>
                    <Link className='hover:text-primary'>Terms & Conditions</Link>
                    <Link className='hover:text-primary'>Privacy Policy</Link>
                </div>

            </div>
            <div className='flex flex-col space-y-4'>
                <h4 className='text-primary font-normal text-[14px] tracking-[4px]'>FAQ</h4>
                <div className='flex flex-col space-y-2 font-light text-gray-500 text-[14px]'>
                    <Link className='hover:text-primary'>Account</Link>
                    <Link className='hover:text-primary'>Manage Deliveries</Link>
                    <Link className='hover:text-primary'>Orders</Link>
                    <Link className='hover:text-primary'>Payments</Link>
                </div>

            </div>
            <div className='flex flex-col space-y-4'>
                <h4 className='text-primary font-normal text-[14px] tracking-[4px]'>RESOURCES</h4>
                <div className='flex flex-col space-y-2 font-light text-gray-500 text-[14px]'>
                    <Link className='hover:text-primary'>Free eBooks</Link>
                    <Link className='hover:text-primary'>Development Tutorial</Link>
                    <Link className='hover:text-primary'>How to - Blog</Link>
                    <Link className='hover:text-primary'>Youtube Playlist</Link>
                </div>

            </div>
        </div>

        <div className='text-gray-500 text-sm font-sans text-center'>
            Shopper (C) 2026 @Honour. All Rights Reserved 
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { Search, UserCircle } from 'lucide-react'
import { FaCartPlus, FaBars } from 'react-icons/fa'


const Navbar = () => {
    return (
        <div className='p-5 md:px-10 xl:px-15 flex items-center justify-between space-x-8 w-full sticky top-0 left-0 right-0 backdrop-blur-2xl z-50'>
            <div className='flex space-x-5 items-center'>
                <div className='md:hidden'>
                    <FaBars />
                </div>
                <Link to={"/"} className='cursor-pointer text-primary font-lupio font-extrabold text-3xl' >

                    SHOPPER
                </Link>
            </div>

            <div className='hidden font-normal leading-none pb-0 mb-0 md:flex'>
                <Link to={"/feeds"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none'>Feeds</Link>
                <Link to={"/new-arrivals"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none'>New Arrivals</Link>
                <Link to={"/contact"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none'>Contact Us</Link>

            </div>

            <div className='flex-1 hidden md:flex'>
                <SearchBox size="xm" placeholder={"Search for products..."} />
            </div>

            <div className='flex space-x-5'>
                <Search size={20} className='md:hidden' />
                <Link to={"/cart"}>
                    <FaCartPlus size={20} />
                </Link>
                <Link to={"/auth/login"}>
                    <UserCircle size={20} />
                </Link>

            </div>

        </div>
    )
}

export default Navbar
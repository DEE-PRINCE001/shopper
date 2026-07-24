import React from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { Search, UserCircle } from 'lucide-react'
import { FaCartPlus, FaBars } from 'react-icons/fa'


const Navbar = () => {
    return (
        <div className='p-5 md:px-10 flex items-center justify-between space-x-8 w-full'>
            <div className='flex space-x-5 items-center'>
                <div className='md:hidden'>
                    <FaBars />
                </div>
                <div className='text-primary font-lupio font-extrabold text-3xl' >

                    SHOPPER
                </div>
            </div>

            <div className='hidden font-normal space-x-5 leading-none pb-0 mb-0 md:flex'>
                <Link className='hover:text-primary pb-0 mb-0 leading-none'>On Sale</Link>
                <Link>New Arrivals</Link>
                <Link>Brands</Link>
            </div>

            <div className='flex-1 hidden md:flex'>
                <SearchBox size = "xm" placeholder={"Search for products..."}/>
            </div>

            <div className='flex space-x-5'>
                <Search size={20} className='md:hidden' />
                <FaCartPlus size={20} />
                <UserCircle size={20} />

            </div>

        </div>
    )
}

export default Navbar
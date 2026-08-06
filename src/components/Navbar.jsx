import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { Search, UserCircle, Package } from 'lucide-react';
import { FaCartPlus, FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/feeds?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/feeds');
        }
    };

    return (
        <div className='p-5 md:px-10 xl:px-15 flex items-center justify-between space-x-8 w-full sticky top-0 left-0 right-0 backdrop-blur-2xl z-50 bg-white/80 border-b border-secondary/50'>
            <div className='flex space-x-5 items-center'>
                <div className='md:hidden cursor-pointer'>
                    <FaBars />
                </div>
                <Link to={"/"} className='cursor-pointer text-primary font-lupio font-extrabold text-3xl'>
                    SHOPPER
                </Link>
            </div>

            <div className='hidden font-normal leading-none pb-0 mb-0 md:flex space-x-1 items-center'>
                <Link to={"/feeds"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none text-sm text-primary font-medium'>Feeds</Link>
                <Link to={"/new-arrivals"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none text-sm text-primary font-medium'>New Arrivals</Link>
                <Link to={"/orders"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none text-sm text-primary font-medium'>My Orders</Link>
                <Link to={"/contact"} className='hover:bg-secondary py-2 px-4 rounded-full mb-0 leading-none text-sm text-primary font-medium'>Contact Us</Link>
            </div>

            <form onSubmit={handleSearchSubmit} className='flex-1 hidden md:flex'>
                <SearchBox
                    size="xm"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className='flex items-center space-x-5'>
                <Link to="/feeds" title="Search Products" className="md:hidden">
                    <Search size={20} className='cursor-pointer hover:text-primary/70 transition' />
                </Link>
                <Link to={"/cart"} title="View Cart">
                    <FaCartPlus size={20} className='hover:text-primary/70 transition text-primary' />
                </Link>
                <Link to={"/orders"} title="My Orders">
                    <Package size={20} className='hover:text-primary/70 transition text-primary' />
                </Link>
                <Link to={"/auth/login"} title="Account / Login">
                    <UserCircle size={22} className='hover:text-primary/70 transition text-primary' />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
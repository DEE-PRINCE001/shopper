import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { Search, UserCircle, Package, X } from 'lucide-react';
import { FaCartPlus, FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mobileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (mobileSearchOpen && mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, [mobileSearchOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/feeds?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/feeds');
        }
        setMobileSearchOpen(false);
    };

    const toggleMobileSearch = () => {
        setMobileSearchOpen((prev) => !prev);
        if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
        if (mobileSearchOpen) setMobileSearchOpen(false);
    };

    return (
        <header className='w-full sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-secondary/60 shadow-xs transition-all duration-300'>
            <div className='p-4 md:p-5 md:px-10 xl:px-15 flex items-center justify-between space-x-4 md:space-x-8'>
                {/* Brand & Mobile Hamburger */}
                <div className='flex space-x-4 items-center'>
                    <button
                        onClick={toggleMobileMenu}
                        className='md:hidden p-1.5 rounded-lg text-primary hover:bg-secondary transition cursor-pointer'
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <FaBars size={18} />}
                    </button>

                    <Link to={"/"} className='cursor-pointer text-primary font-lupio font-extrabold text-2xl md:text-3xl tracking-tight'>
                        SHOPPER
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav className='hidden font-normal leading-none pb-0 mb-0 md:flex space-x-1 items-center'>
                    <Link to={"/feeds"} className='hover:bg-secondary py-2 px-4 rounded-full text-sm text-primary font-medium transition'>Feeds</Link>
                    <Link to={"/new-arrivals"} className='hover:bg-secondary py-2 px-4 rounded-full text-sm text-primary font-medium transition'>New Arrivals</Link>
                    <Link to={"/orders"} className='hover:bg-secondary py-2 px-4 rounded-full text-sm text-primary font-medium transition'>My Orders</Link>
                    <Link to={"/contact"} className='hover:bg-secondary py-2 px-4 rounded-full text-sm text-primary font-medium transition'>Contact Us</Link>
                </nav>

                {/* Desktop Search Bar */}
                <form onSubmit={handleSearchSubmit} className='flex-1 hidden md:flex max-w-md'>
                    <SearchBox
                        size="xm"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Action Icons */}
                <div className='flex items-center space-x-4 md:space-x-5'>
                    {/* Mobile Search Toggle Icon */}
                    <button
                        onClick={toggleMobileSearch}
                        className="md:hidden p-1.5 rounded-full hover:bg-secondary transition text-primary cursor-pointer"
                        title="Search Products"
                        aria-label="Toggle mobile search"
                    >
                        {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    <Link to={"/cart"} title="View Cart" className="p-1 hover:opacity-80 transition">
                        <FaCartPlus size={20} className='text-primary' />
                    </Link>

                    <Link to={"/orders"} title="My Orders" className="p-1 hover:opacity-80 transition">
                        <Package size={20} className='text-primary' />
                    </Link>

                    <Link to={"/auth/login"} title="Account / Login" className="p-1 hover:opacity-80 transition">
                        <UserCircle size={22} className='text-primary' />
                    </Link>
                </div>
            </div>

            {/* Expandable Mobile Search Bar Container */}
            {mobileSearchOpen && (
                <div className='md:hidden px-4 pb-4 pt-1 border-t border-secondary/40 bg-white/95 animate-fadeIn duration-200'>
                    <form onSubmit={handleSearchSubmit} className='flex items-center space-x-2'>
                        <div className="flex-1">
                            <SearchBox
                                ref={mobileInputRef}
                                size="xm"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition cursor-pointer"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            {/* Expandable Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden px-5 py-4 border-t border-secondary/50 bg-white flex flex-col space-y-3 font-medium text-sm text-primary shadow-lg animate-fadeIn'>
                    <Link
                        to={"/feeds"}
                        onClick={() => setMobileMenuOpen(false)}
                        className='py-2 px-3 hover:bg-secondary rounded-xl transition'
                    >
                        Feeds
                    </Link>
                    <Link
                        to={"/new-arrivals"}
                        onClick={() => setMobileMenuOpen(false)}
                        className='py-2 px-3 hover:bg-secondary rounded-xl transition'
                    >
                        New Arrivals
                    </Link>
                    <Link
                        to={"/orders"}
                        onClick={() => setMobileMenuOpen(false)}
                        className='py-2 px-3 hover:bg-secondary rounded-xl transition'
                    >
                        My Orders
                    </Link>
                    <Link
                        to={"/contact"}
                        onClick={() => setMobileMenuOpen(false)}
                        className='py-2 px-3 hover:bg-secondary rounded-xl transition'
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
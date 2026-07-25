import React from 'react'
import electronics from "/images/electronics.png"
import Button from './Button'
import StatLabel from './StatLabel'
import Category from './Category'

const HeroSection = () => {
    return (
        <div className='bg-secondary w-full'>
            <div className='flex pt-10 pb-3 px-5 md:px-10 xl:px-15 text-primary flex-col space-y-5 md:space-y-0 md:flex-row'>
                <div className='w-full md:w-1/2 flex flex-col space-y-5 items-center md:items-start'>
                    <div className='pt-5 text-4xl sm:text-5xl font-extrabold leading-10 sm:leading-12 text-center md:text-left'>EVERYTHING <br /> YOU NEED, ALL <br />IN ONE PLACE</div>
                    <p className="text-[16px] font-light xl:w-[90%] text-center md:text-left">Discover quality products acrross electronics, fashion,
                        groceries, home essentials, beauty, and much more.
                    </p>
                    <div className='flex space-x-5'>
                        <Button colors={"bg-primary text-secondary hover:bg-primary/80 border-primary"} >Shop Now</Button>
                        <Button className={"px-5"} >Explore Products</Button>
                    </div>

                    <div className='flex flex-col mt-2 space-y-2 items-center md:flex-row md:justify-between w-[90%] xl:w-[70%]'>
                        <div className='flex justify-between md:justify-normal w-full space-x-10'>
                            <StatLabel value={"10,000+"} title={"Products"} />
                            <StatLabel value={"50+"} title={"Categories"} />
                            <StatLabel className="hidden md:inline" value={"30,000+"} title={"Satisfied Customers"} />
                        </div>
                        <StatLabel className={"md:hidden"} value={"30,000+"} title={"Satisfied Customers"} />

                    </div>
                </div>
                <div className='flex flex-col space-y-5 items-center w-full md:w-1/2'>
                    <div className='w-full h-full rounded-full'>
                        <img className='drop-shadow-2xl drop-shadow-gray-300' src={electronics} />
                    </div>

                    <div>
                        <div className='px-7 font-semibold text-center w-fit rounded-full border-2 py-2 border-primary'>Fashion</div>
                    </div>
                </div>

            </div>
            <div className='w-full px-5 md:px-10 xl:px-15 bg-primary py-5 h-fit flex space-x-8 items-center justify-between overflow-auto scrollbar-none'>
                <Category cat={"Electronics"} />
                <Category cat={"Fashion"} />
                <Category cat={"Beauty"} />
                <Category cat={"Furnitures"} />
                <Category cat={"Groceries"} />
                <Category cat={"Sports"} />
            </div>
        </div>


    )
}

export default HeroSection
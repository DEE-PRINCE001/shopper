import React, { useEffect, useState } from 'react'
import electronics from "/images/electronics.png"
import fashion from "/images/fashion.png"
import furniture from "/images/furniture.png"
import groceries from "/images/groceries.png"
import Button from './Button'
import StatLabel from './StatLabel'
import Category from './Category'
import { useNavigate } from 'react-router-dom'

const heroSlides = [
    {
        title: "Electronics",
        image: electronics,
    },
    {
        title: "Fashion",
        image: fashion,
    },
    {
        title: "Furnitures",
        image: furniture,
    },
    {
        title: "Groceries",
        image: groceries,
    },
]

const HeroSection = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    // Calculate the index of the slide that is currently exiting
    const prevIndex = (current - 1 + heroSlides.length) % heroSlides.length

    return (
        <div className='bg-secondary w-full'>
            <div className='flex pt-10 pb-3 px-5 md:px-10 xl:px-15 text-primary flex-col space-y-5 md:space-y-0 md:flex-row'>
                <div className='w-full md:w-1/2 flex flex-col space-y-5 items-center md:items-start'>
                    <div className='pt-5 text-4xl sm:text-5xl font-archivo font-extrabold leading-10 sm:leading-12 text-center md:text-left'>
                        EVERYTHING <br /> YOU NEED, ALL <br />IN ONE PLACE
                    </div>
                    <p className="text-[16px] font-light xl:w-[90%] text-center md:text-left">
                        Discover quality products across electronics, fashion,
                        groceries, home essentials, beauty, and much more.
                    </p>
                    <div className='flex space-x-5'>
                        <Button onClick={() => navigate("/auth/register")} colors={"bg-primary text-secondary hover:bg-primary/80 border-primary"}>Sign Up</Button>
                        <Button onClick={() => navigate("/feeds")} className={"px-5"}>Explore Products</Button>
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
                    {/* Image Container with Relative & Perspective Stacking */}
                    <div className='relative w-full h-94 flex justify-center items-center overflow-hidden'>
                        {heroSlides.map((slide, index) => {
                            const isActive = index === current
                            const isPrev = index === prevIndex

                            // Determine 3D rotation based on whether the slide is active, exiting, or waiting
                            let transformStyle = "opacity-0 scale-75 [transform:perspective(1000px)_rotateY(90deg)] pointer-events-none"
                            
                            if (isActive) {
                                transformStyle = "opacity-100 scale-100 [transform:perspective(1000px)_rotateY(0deg)] z-10"
                            } else if (isPrev) {
                                transformStyle = "opacity-0 scale-75 [transform:perspective(1000px)_rotateY(-90deg)] pointer-events-none"
                            }

                            return (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={slide.title}
                                    className={`absolute h-94 w-auto object-contain drop-shadow-2xl drop-shadow-gray-300 transition-all duration-900 ease-in-out ${transformStyle}`}
                                />
                            )
                        })}
                    </div>

                    {/* Title Badge with Smooth Fade Transition */}
                    <div className='h-10 flex items-center justify-center'>
                        <div key={current} className='px-7 font-semibold text-center w-fit rounded-full border-2 py-2 border-primary animate-fadeIn'>
                            {heroSlides[current].title}
                        </div>
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
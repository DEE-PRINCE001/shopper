import React from 'react'
import electronics from "/images/fashion.png"

const HeroSection = () => {
    return (
        <div className='bg-secondary w-full py-10 px-5 md:px-10'>
            <div className='flex text-primary flex-col md:flex-row'>
                <div className='w-full md:w-1/2 flex flex-col'>
                    <div className='text-5xl font-extrabold'>EVERYTHING <br /> YOU NEED, ALL <br />IN ONE PLACE</div>
                </div>
                <div className='flex flex-col items-center w-full md:w-1/2'>
                    <div className='w-full h-full rounded-full'>
                        <img src={electronics} />
                    </div>

                    <div>
                        <div className='px-7 font-semibold text-center w-fit rounded-full border-2 py-2 border-primary'>Fashion</div>
                    </div>

                </div>

            </div>
        </div>


    )
}

export default HeroSection
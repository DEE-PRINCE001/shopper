import React from 'react'
import Ratings from './Ratings'

const Product = ({ img, name = "Skinny Fit Jeans", rating = 0, price=180, discount }) => {
    return (
        <div className='flex flex-col space-y-5'>
            <div className='rounded-2xl flex items-center justify-center bg-secondary p-3 w-1/4 aspect-square'> <img src={img} alt={name.slice(0, 7)} /></div>
            <div className='flex flex-col font-sans space-y-1'>
                <h2 className='text-primary font-semibold text-lg leading-none'>{name}</h2>
                <div className='flex space-x-2'>
                    <Ratings rating={rating} />
                    <div className='text-sm font-sans font-medium text-primary'>{rating}/<span className='text-gray-400 font-normal font-sans'>5</span></div>
                </div>
                <div className='flex space-x-2'>
                    <div className='text-xl font-bold text-primary'>${price}</div>
                    {discount && <div className='flex space-x-2'>
                        <div className='text-xl font-bold text-gray-400'>${price}</div>
                        <div className='text-[6px] text-center bg-red-100 rounded-lg px-2 py-1 font-bold text-red-500'>-{discount}%</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Product
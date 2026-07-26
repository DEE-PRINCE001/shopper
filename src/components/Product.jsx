import React from 'react'
import Ratings from './Ratings'
import { CalculateDiscount } from '../utils/DicountCalculator'

const Product = ({ img, name = "Skinny Fit Jeans", rating = 0, price=260, discount}) => {
    return (
        <div className='flex flex-col space-y-5'>
            <div className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-full aspect-square'> <img src={img} alt={name.slice(0, 7)} className='object-cover hover:scale-105 transition duration-300'/></div>
            <div className='flex flex-col font-sans space-y-1'>
                <h2 className='text-primary font-bold text-lg leading-none'>{name}</h2>
                <div className='flex space-x-2'>
                    <Ratings rating={rating} />
                    <div className='text-sm font-sans font-medium text-primary'>{rating}/<span className='text-gray-400 font-normal font-sans'>5</span></div>
                </div>
                <div className='flex space-x-2'>
                    <div className='text-xl font-bold text-primary'>${discount? CalculateDiscount(discount, price) : price }</div>
                    {discount && <div className='flex space-x-2 items-center'>
                        <div className='text-xl font-bold text-gray-400/70 line-through'>${price}</div>
                        <div className='text-[12px] bg-red-100 rounded-full font-bold text-red-500 h-fit px-2 leading-5'>-{discount}%</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Product
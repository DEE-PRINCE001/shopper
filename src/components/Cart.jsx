import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import Ratings from './Ratings';



const Cart = ({ data, rating = 4, name = "Gradient Graphic-T-Shirt", price = 400, img }) => {

  const [count, setCount] = useState(1);

  const handleMinusClick = () => {
    if (count <= 1) {
      alert("Cart cannot be less than 1")
      return;
    }
    setCount((prev) => prev - 1)
  }
  return (
    <div className='flex justify-between w-full py-5 border-b border-secondary'>
      <div className='flex space-x-5'>
        <div className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-30 aspect-square'> <img src={img} alt={name.slice(0, 7)} className='object-cover hover:scale-105 transition duration-300' /></div>
        <div className='flex flex-col font-sans space-y-1 justify-between py-2'>
          <div className='flex flex-col font-sans space-y-3'>
            <h2 className='text-primary font-bold text-lg leading-none'>{name}</h2>
            <div className='flex space-x-2'>
              <Ratings rating={rating} />
              <div className='text-sm font-sans font-medium text-primary'>{rating}/<span className='text-gray-400 font-normal font-sans'>5</span></div>
            </div>
          </div>
          <div className='flex space-x-2'>
            <div className='text-2xl font-bold text-primary'>${price}</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div className='rounded-full p-2 h-fit w-fit flex justify-between items-center hover:bg-secondary cursor-pointer'>
          <Trash2 size={20} className='text-red-500' />
        </div>
        <div className='bg-secondary py-2 px-3 flex space-x-5 rounded-full'>
          <button onClick={handleMinusClick} className='cursor-pointer'><Minus size={20} /></button>
          <div>{count}</div>
          <button onClick={() => setCount((prev) => prev + 1)} className='cursor-pointer'><Plus size={20} /></button>
        </div>
      </div>

    </div>
  )
}

export default Cart;
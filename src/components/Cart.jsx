import { Circle, Minus, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Ratings from './Ratings';
import { jwtDecode } from 'jwt-decode';
import { cartApi } from '../api';


const Cart = ({ data, rating = 4, name = "Gradient Graphic-T-Shirt", price = 400, img }) => {

  const [quantity, setQuantity] = useState(data.quantity);
  const [loading, setLoading] = useState(false);

  const cartId = jwtDecode(localStorage.getItem("accessToken")).nameid;

  useEffect(() => {
    const updateCart = async () => {
      try {
        setLoading(true)
        const response = await cartApi.updateCartItem({ "cartId": cartId, "productId": data.productId, "quantity": quantity })


      }
      catch (err) {
        console.log(err)
        alert(err)
      }
      finally {
        setLoading(false)
      }
    }
    updateCart()

  }, [quantity])



  const handleMinusClick = () => {
    if (quantity <= 1) {
      alert("Cart cannot be less than 1")
      return;
    }
    setQuantity((prev) => prev - 1)
  }
  return (
    <div className='flex justify-between w-full py-5 border-b border-secondary'>
      <div className='flex space-x-5'>
        <div className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-30 aspect-square'> <img src={img} alt={name.slice(0, 7)} className='object-cover hover:scale-105 transition duration-300' /></div>
        <div className='flex flex-col font-sans space-y-1 justify-between py-2'>
          <div className='flex flex-col font-sans space-y-3'>
            <h2 className='text-primary font-bold text-lg leading-none'>{data.productName}</h2>
            <div className='flex space-x-2'>
              <Ratings rating={rating} />
              <div className='text-sm font-sans font-medium text-primary'>{rating}/<span className='text-gray-400 font-normal font-sans'>5</span></div>
            </div>
          </div>
          <div className='flex space-x-2'>
            <div className='text-2xl font-bold text-primary'>${data.price}</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div className='rounded-full p-2 h-fit w-fit flex justify-between items-center hover:bg-secondary cursor-pointer'>
          <Trash2 size={20} className='text-red-500' />
        </div>
        <div className={"flex flex-col space-y-2 items-end"}>
          <div className='bg-secondary py-2 px-3 flex space-x-5 rounded-full'>
            <button onClick={handleMinusClick} className='cursor-pointer'><Minus size={20} /></button>
            <div className={`${loading ? "animate:pulse" : ""}`}>{loading ? <Circle /> : quantity}</div>
            <button onClick={() => setQuantity((prev) => prev + 1)} className='cursor-pointer'><Plus size={20} /></button>
          </div>
          <div className={"text-gray-500"}>${data.totalPrice}</div>
        </div>
      </div>

    </div>
  )
}

export default Cart;
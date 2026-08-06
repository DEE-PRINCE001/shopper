import React, { useState } from 'react'
import Ratings from './Ratings'
import { CalculateDiscount } from '../utils/DicountCalculator'
import Button from './Button'
import { FaCartPlus } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode'
import { cartApi } from '../api'


       
              
const Product = ({ img, name = "Skinny Fit Jeans", rating = 0, price=260, discount, data}) => {

    const [loading, setLoading] = useState(false)

     const cartId = jwtDecode(localStorage.getItem("accessToken")).nameid;
    
      const handleSave = async (e) => {
        e.preventDefault()
    
        if (!cartId){
          alert("Kindly login to add to cart")
          return;
        }
        try{
            setLoading(true)
            alert(`Adding ${data.name} with ID ${data.id} to cart with the id: ${cartId}`)
            const response = await cartApi.updateCartItem({"cartId":cartId, "productId":data.id, "quantity":1})
            alert(`${data.name} Added to Cart Successfuly`)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
        finally{
            setLoading(false)
        }
    
      }
      const ratings = (Math.random() * 5).toFixed(1);
    return (
        <div className='flex flex-col space-y-4'>
            <div className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-full aspect-square'> <img src={data.imageUrl} loading='lazy' alt={name.slice(0, 7)} className='object-cover aspect-square hover:scale-105 transition duration-300'/></div>
            <div className='flex flex-col font-sans space-y-1 mb-2'>
                <h2 className='text-primary font-bold text-lg leading-none'>{data.name}</h2>
                <div className='flex space-x-2'>
                    <Ratings rating={ratings} />
                    <div className='text-sm font-sans font-medium text-primary'>{ratings}/<span className='text-gray-400 font-normal font-sans'>5</span></div>
                </div>
                <div className='flex space-x-2'>
                    <div className='text-xl font-bold text-primary'>${data.stockQuantity > 10? CalculateDiscount(data.stockQuantity % 50, data.price) : price }</div>
                    {(data.stockQuantity > 10) && <div className='flex space-x-2 items-center'>
                        <div className='text-xl font-bold text-gray-400/70 line-through'>${data.price}</div>
                        <div className='text-[12px] bg-red-100 rounded-full font-bold text-red-500 h-fit px-2 leading-5'>-{data.stockQuantity % 50}%</div>
                    </div>}
                </div>
            </div>
            <Button onClick={handleSave} disabled={loading} size={"w-full py-2 mt-0 text-center"} leftIcon={<FaCartPlus className='text-white' size={20} />} colors={"enabled:bg-primary disabled:bg-primary/50 border-primary text-white hover:bg-primary/80"}>{loading? "Adding..." : "Add to Cart"}</Button>
        </div>
    )
}

export default Product
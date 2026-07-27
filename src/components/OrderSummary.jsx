import React from 'react'
import Button from './Button'
import { ArrowRightIcon } from 'lucide-react'

const OrderSummary = ({ price = 565, discount = 20 }) => {
    const discountedPrice = (discount / 100) * price
    return (
        <div className='p-5 flex flex-col border h-fit border-secondary rounded-2xl'>
            <div className='pb-5 border-b border-secondary flex flex-col space-y-5'>
                <h2 className='text-primary font-bold text-lg'>Order Summary</h2>
                <div className='flex justify-between'>
                    <div className='text-gray-500 font-light'>Subtotal</div>
                    <div className='font-semibold text-primary'>${price}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='text-gray-500 font-light'>{`Discount(-${discount}%)`}</div>
                    <div className='font-semibold text-red-500'>$-{discountedPrice}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='text-gray-500 font-light'>Delivery</div>
                    <div className='font-semibold text-primary'>$15</div>
                </div>
            </div>
            <div className='pt-5 flex flex-col space-y-3 md:space-y-5'>
                <div className='flex justify-between'>
                    <div className='text-primary font-light'>Total</div>
                    <div className='font-semibold text-lg text-primary'>${price-discountedPrice}</div>
                </div>
                <div className='flex-1 flex space-x-3'>
                    <input type='text' placeholder='Add promo code' className='flex-1 bg-secondary pl-4 md:pl-6 py-2 rounded-full'/>
                    <Button size={"px-7 py-2"} colors={"bg-primary text-white"}>Apply</Button>
                </div>
                <Button size={"w-full py-2"} colors={"text-white bg-primary border-primary hover:bg-primary/90 hover:border-primary/90"} rightIcon={<ArrowRightIcon size={20} className='text-white'/>}>Go to Checkout</Button>
            </div>
        </div>
    )
}

export default OrderSummary;
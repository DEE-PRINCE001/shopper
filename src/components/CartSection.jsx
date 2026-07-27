import React from 'react'
import Cart from './Cart'
import OrderSummary from './OrderSummary'
import furnitures from '/images/furniture.png';

const CartSection = () => {
  return (
    <div className='flex flex-col space-y-3 flex-1 mx-5 md:mx-10 xl:mx-15'>
        <h2 className='text-primary text-2xl font-extrabold font-archivo'>YOUR CART</h2>
        <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
            <div className='flex-1 flex flex-col px-5 py-0 border border-secondary rounded-2xl '>
                <Cart img={furnitures}/>
                <Cart img={furnitures}/>
                <Cart img={furnitures}/>
            </div>
            <OrderSummary/>

        </div>
    </div>
  )
}

export default CartSection
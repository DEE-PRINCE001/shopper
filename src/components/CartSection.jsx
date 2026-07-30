import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import OrderSummary from './OrderSummary'
import furnitures from '/images/furniture.png';
import { cartApi } from '../api';
import { jwtDecode } from 'jwt-decode';
import ProductLoadingState from './ProductLoadingState';


const CartSection = () => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [refresh, setRefresh] = useState(1);


  const cartId = jwtDecode(localStorage.getItem("accessToken")).nameid;
  useEffect(() => {    
    const fetchCart = async () => {
    try{

        setLoading(true)
        const response = await cartApi.getCart(cartId);
        setCart(response.items)
        setOrder(response)
        console.log("cart", response)
      }
      catch(err) {
        console.log(err)
        alert(err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchCart();
  }, [refresh])

  if (loading) {
    return (
      <ProductLoadingState />
    )
  }
  return (
    <div className='flex flex-col space-y-3 flex-1 mx-5 md:mx-10 xl:mx-15'>
        <h2 className='text-primary text-2xl font-extrabold font-archivo'>Your Cart</h2>
        <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
            <div className='flex-1 flex flex-col px-5 py-0 border border-secondary rounded-2xl '>
                {cart.map((item) => <Cart key={item.productId}  img={furnitures} data={item}/>)}
            </div>
            <OrderSummary data={order} onCalculate={() => setRefresh((prev) => prev + 1)}/>

        </div>
    </div>
  )
}

export default CartSection
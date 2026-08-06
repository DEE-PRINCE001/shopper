
import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import OrderSummary from './OrderSummary';
import furnitures from '/images/furniture.png';
import { cartApi } from '../api';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CartSection = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [refresh, setRefresh] = useState(false);
  
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  let cartId = null;

  try {
    if (token) {
      cartId = jwtDecode(token).nameid;
    }
  } catch (err) {
    toast.error('Invalid access token. Please log in again.');
    setTimeout(() => {
      navigate("/auth/login")
    }, 1000);
  }

  useEffect(() => {
    const fetchCart = async () => {
      if (!cartId) {
        console.error('Cart ID could not be determined.');
        return;
      }

      try {
        setLoading(true);

        const response = await cartApi.getCart(cartId);

        setCart(response.items);
        setCartSummary(response);

        console.log('cart products', response);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        toast.error('Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [refresh, cartId]);

  const handleClearCart = async () => {
    if (!cartId) return;
    try {
      setLoading(true);
      await cartApi.deleteCart(cartId);
      toast.success('Cart cleared successfully.');
      setCart([]);
      setCartSummary(null);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      toast.error('Failed to clear cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col space-y-3 flex-1 mx-5 md:mx-10 xl:mx-15 py-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-primary text-2xl font-extrabold font-archivo'>
          Your Cart
        </h2>

        {cart && cart.length > 0 && (
          <button
            onClick={handleClearCart}
            disabled={loading}
            className='text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-50 transition cursor-pointer disabled:opacity-50'
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
        <div className='flex-1 flex flex-col px-5 py-0 border border-secondary rounded-2xl'>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <Cart
                setRefresh={setRefresh}
                key={item.productId}
                img={furnitures}
                data={item}
              />
            ))
          ) : !loading ? (
            <div className='py-10 text-center text-gray-500'>
              Your cart is empty.
            </div>
          ) : null}
        </div>

        {cartSummary && cart.length > 0 && (
          <OrderSummary
            loading={loading}
            data={cartSummary}
          />
        )}
      </div>
    </div>
  );
};

export default CartSection;


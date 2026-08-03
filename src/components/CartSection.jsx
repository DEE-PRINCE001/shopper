
import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import OrderSummary from './OrderSummary';
import furnitures from '/images/furniture.png';
import { cartApi } from '../api';
import { jwtDecode } from 'jwt-decode';

const CartSection = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('accessToken');

  let cartId = null;

  try {
    if (token) {
      cartId = jwtDecode(token).nameid;
    }
  } catch (err) {
    console.error('Invalid access token:', err);
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

        console.log('cart', response);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        alert('Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [refresh, cartId]);

  return (
    <div className='flex flex-col space-y-3 flex-1 mx-5 md:mx-10 xl:mx-15'>
      <h2 className='text-primary text-2xl font-extrabold font-archivo'>
        Your Cart
      </h2>

      <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
        <div className='flex-1 flex flex-col px-5 py-0 border border-secondary rounded-2xl'>
          {cart.length > 0 ? (
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

        {cartSummary && (
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


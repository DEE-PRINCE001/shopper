
import { LoaderCircle, Minus, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Ratings from './Ratings';
import { jwtDecode } from 'jwt-decode';
import { cartApi } from '../api';
import toast from 'react-hot-toast';

const Cart = ({
  data,
  setRefresh,
  rating = 4,
  name = 'Gradient Graphic-T-Shirt',
  img,
}) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [loading, setLoading] = useState(false);

  const isInitialRender = useRef(true);
  const lastSuccessfulQuantity = useRef(data.quantity);
  const updateTimeout = useRef(null);

  const token = localStorage.getItem('accessToken');

  let cartId = null;

  try {
    if (token) {
      cartId = jwtDecode(token).nameid;
    }
  } catch (error) {
    console.error('Invalid access token:', error);
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(async () => {
      if (!cartId) {
        console.error('Cart ID could not be determined.');
        return;
      }

      const newQuantity = quantity;
      const previousQuantity = lastSuccessfulQuantity.current;

      try {
        setLoading(true);
               

        await cartApi.updateCartItem({"cartId":cartId, "productId": data.productId, "quantity": newQuantity});

        lastSuccessfulQuantity.current = newQuantity;

        // Refresh the parent summary after successful update
        setRefresh((prev) => !prev);

      } catch (err) {        
        if (quantity === newQuantity) {
          setQuantity(previousQuantity);
        }
        toast.error('Failed to update cart item.');

        
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [quantity, cartId, data.productId, setRefresh]);

  const handleMinusClick = () => {
    if (loading) return;

    if (quantity <= 1) {
      toast.error('Cart cannot be less than 1');
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handlePlusClick = () => {
    if (loading) return;

    setQuantity((prev) => prev + 1);
  };

  const handleDeleteClick = () => {
    if (loading) return;

    setQuantity(0);
  };

  const totalPrice = data.price * quantity;

  return (
    <div className='flex justify-between w-full py-5 border-b border-secondary'>
      <div className='flex space-x-5'>
        <div className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-30 aspect-square'>
          <img
            src={img}
            alt={name.slice(0, 7)}
            className='object-cover hover:scale-105 transition duration-300'
          />
        </div>

        <div className='flex flex-col font-sans space-y-1 justify-between py-2'>
          <div className='flex flex-col font-sans space-y-3'>
            <h2 className='text-primary font-bold text-lg leading-none'>
              {data.productName}
            </h2>

            <div className='flex space-x-2'>
              <Ratings rating={rating} />

              <div className='text-sm font-sans font-medium text-primary'>
                {rating}/
                <span className='text-gray-400 font-normal font-sans'>
                  5
                </span>
              </div>
            </div>
          </div>

          <div className='flex space-x-2'>
            <div className='text-2xl font-bold text-primary'>
              ${Number(data.price).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div
          onClick={handleDeleteClick}
          className='rounded-full p-2 h-fit w-fit flex justify-between items-center hover:bg-secondary cursor-pointer'
        >
          <Trash2 size={20} className='text-red-500' />
        </div>

        <div className='flex flex-col space-y-2 items-end'>
          <div className='bg-secondary py-2 px-3 flex space-x-5 rounded-full'>
            <button
              onClick={handleMinusClick}
              disabled={loading}
              className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Minus size={20} />
            </button>

            <div
              className={`${loading ? 'animate-pulse' : ''}`}
            >
              {loading ? (
                <LoaderCircle size={20} className='animate-spin' />
              ) : (
                quantity
              )}
            </div>

            <button
              onClick={handlePlusClick}
              disabled={loading}
              className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Plus size={20} />
            </button>
          </div>

          <div
            className={`${loading ? 'animate-pulse' : 'text-gray-500'
              }`}
          >
            ${loading ? '-' : totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

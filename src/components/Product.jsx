import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ratings from './Ratings';
import { CalculateDiscount } from '../utils/DicountCalculator';
import Button from './Button';
import { FaCartPlus } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { cartApi } from '../api';
import toast from 'react-hot-toast';
import furnitures from '/images/furniture.png';

const Product = ({ img, name = "Product", price = 100, data }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to add items to your cart.");
      navigate("/auth/login");
      return;
    }

    let cartId = null;
    try {
      cartId = jwtDecode(token).nameid;
    } catch (err) {
      toast.error("Session expired. Please login again.");
      navigate("/auth/login");
      return;
    }

    try {
      setLoading(true);
      const productId = data?.id || data?.productId;
      await cartApi.updateCartItem({
        cartId: cartId,
        productId: productId,
        quantity: 1,
      });
      toast.success(`${data?.name || name} added to cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error('Failed to add item to cart.');
    } finally {
      setLoading(false);
    }
  };

  const productData = data || {
    id: 1,
    name: name,
    price: price,
    stockQuantity: 20,
    imageUrl: img || furnitures,
  };

  const ratingValue = (4 + (productData.id % 10) / 10).toFixed(1);
  const finalPrice = productData.stockQuantity > 10
    ? CalculateDiscount(productData.stockQuantity % 50, productData.price)
    : productData.price;

  return (
    <div className='flex flex-col space-y-4 group'>
      <Link
        to={`/products/${productData.id}`}
        className='rounded-2xl flex items-center justify-center overflow-hidden bg-secondary p-3 w-full aspect-square cursor-pointer'
      >
        <img
          src={productData.imageUrl || img || furnitures}
          loading='lazy'
          alt={productData.name.slice(0, 15)}
          className='object-cover aspect-square group-hover:scale-105 transition duration-300'
        />
      </Link>

      <div className='flex flex-col font-sans space-y-1 mb-2'>
        <Link
          to={`/products/${productData.id}`}
          className='text-primary font-bold text-lg leading-tight hover:underline line-clamp-1'
        >
          {productData.name}
        </Link>

        <div className='flex space-x-2 items-center'>
          <Ratings rating={ratingValue} />
          <div className='text-sm font-sans font-medium text-primary'>
            {ratingValue}/
            <span className='text-gray-400 font-normal font-sans'>5</span>
          </div>
        </div>

        <div className='flex space-x-2 items-center pt-1'>
          <div className='text-xl font-bold text-primary'>
            ${Number(finalPrice).toFixed(2)}
          </div>

          {productData.stockQuantity > 10 && (
            <div className='flex space-x-2 items-center'>
              <div className='text-base font-bold text-gray-400/70 line-through'>
                ${Number(productData.price).toFixed(2)}
              </div>
              <div className='text-[12px] bg-red-100 rounded-full font-bold text-red-500 h-fit px-2 leading-5'>
                -{productData.stockQuantity % 50}%
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={loading}
        size={"w-full py-2 mt-0 text-center"}
        leftIcon={<FaCartPlus className='text-white' size={18} />}
        colors={"enabled:bg-primary disabled:bg-primary/50 border-primary text-white hover:bg-primary/90"}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
};

export default Product;
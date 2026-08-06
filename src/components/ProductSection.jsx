import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import Button from './Button';
import ProductLoadingState from './ProductLoadingState';
import { catalogApi } from '../api';
import toast from 'react-hot-toast';

const ProductSection = ({ name = "New Arrivals", border, params = {}, limit }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getProducts(params);
        const list = Array.isArray(response)
          ? response
          : response?.items || response?.products || [];

        setProducts(list);
      } catch (err) {
        console.error('Failed to load products:', err);
        toast.error('Failed to load catalog products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params)]);

  if (loading) {
    return <ProductLoadingState />;
  }

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className={`flex py-10 ${border ? "border-b border-secondary" : ""} flex-1 items-center flex-col space-y-6 mx-5 md:mx-10 xl:mx-15`}>
      <div className='w-full text-center font-archivo font-extrabold text-2xl md:text-3xl text-primary'>
        {name.toUpperCase()}
      </div>

      {displayedProducts.length === 0 ? (
        <div className='py-12 text-center text-gray-500 text-sm'>
          No products found matching your criteria.
        </div>
      ) : (
        <div className='grid w-full flex-1 grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
          {displayedProducts.map((product, idx) => (
            <Product key={product.id || idx} data={product} />
          ))}
        </div>
      )}

      {limit && products.length > limit && (
        <Button
          onClick={() => navigate('/feeds')}
          colors="border border-secondary mt-4 hover:bg-secondary text-primary font-semibold"
          className="justify-self-center px-12 py-2.5 w-full md:w-fit cursor-pointer"
        >
          View All Products
        </Button>
      )}
    </div>
  );
};

export default ProductSection;
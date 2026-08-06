import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { catalogApi, cartApi } from '../../api';
import Ratings from '../../components/Ratings';
import Button from '../../components/Button';
import ProductSection from '../../components/ProductSection';
import { CalculateDiscount } from '../../utils/DicountCalculator';
import { FaCartPlus } from 'react-icons/fa';
import { Minus, Plus, ShieldCheck, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import furnitures from '/images/furniture.png';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getProducts({ PageSize: 100 });
        const items = response.items || response.products || [];
        const found = items.find((p) => String(p.id) === String(id));
        
        if (found) {
          setProduct(found);
        } else {
          toast.error('Product not found.');
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        toast.error('Error loading product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Please login to add items to your cart.');
      navigate('/auth/login');
      return;
    }

    let cartId = null;
    try {
      cartId = jwtDecode(token).nameid;
    } catch (e) {
      toast.error('Session expired. Please login again.');
      navigate('/auth/login');
      return;
    }

    try {
      setAdding(true);
      await cartApi.updateCartItem({
        cartId: cartId,
        productId: product.id,
        quantity: quantity,
      });
      toast.success(`${product.name} added to your cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error('Failed to add product to cart.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-5 md:mx-10 xl:mx-15 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Product Not Found</h2>
        <p className="text-gray-500 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const rating = 4.5;
  const discountedPrice =
    product.stockQuantity > 10
      ? CalculateDiscount(product.stockQuantity % 50, product.price)
      : product.price;

  return (
    <div className="mx-5 md:mx-10 xl:mx-15 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <span>/</span>
        <Link to="/feeds" className="hover:text-primary transition">Products</Link>
        <span>/</span>
        <span className="text-primary font-medium truncate max-w-[200px] md:max-w-xs">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Product Image Box */}
        <div className="bg-secondary rounded-2xl p-6 md:p-10 flex items-center justify-center aspect-square overflow-hidden border border-secondary">
          <img
            src={product.imageUrl || furnitures}
            alt={product.name}
            className="object-contain max-h-[80%] max-w-[80%] hover:scale-105 transition duration-500"
          />
        </div>

        {/* Info & Action Box */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-archivo text-primary leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-3 mt-3">
              <Ratings rating={rating} />
              <span className="text-sm font-semibold text-primary">{rating} / 5</span>
              <span className="text-xs text-gray-400">({product.stockQuantity || 12} reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-extrabold text-primary">${Number(discountedPrice).toFixed(2)}</span>
            {product.stockQuantity > 10 && (
              <>
                <span className="text-xl font-bold text-gray-400 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                  -{product.stockQuantity % 50}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status Badge */}
          <div className="flex items-center space-x-2">
            <PackageCheck size={18} className={product.stockQuantity > 0 ? "text-green-600" : "text-red-500"} />
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              product.stockQuantity > 0 ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed border-t border-b border-secondary py-4">
            {product.description || "High quality product crafted with premium materials to deliver durability, style, and comfort for everyday use."}
          </p>

          {/* Quantity and Add to Cart Action */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-primary">Quantity:</span>
              <div className="bg-secondary py-2 px-4 flex items-center space-x-5 rounded-full border border-secondary">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="cursor-pointer hover:text-primary transition"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-sm text-primary w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="cursor-pointer hover:text-primary transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={adding || product.stockQuantity <= 0}
              size="w-full py-3.5"
              leftIcon={<FaCartPlus size={18} className="text-white" />}
              colors="bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {adding ? "Adding to Cart..." : "Add to Cart"}
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary text-xs text-gray-600">
            <div className="flex items-center space-x-2.5">
              <Truck size={18} className="text-primary" />
              <span>Fast & Free Standard Delivery</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck size={18} className="text-primary" />
              <span>100% Authentic Product</span>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like / Related Products Section */}
      <div className="pt-8">
        <ProductSection name="You Might Also Like" border={false} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;

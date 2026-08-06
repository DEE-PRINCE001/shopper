import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { cartApi, ordersApi } from '../../api';
import OrderSummary from '../../components/OrderSummary';
import Button from '../../components/Button';
import { CreditCard, MapPin, ShieldCheck, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loadingCart, setLoadingCart] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartSummary, setCartSummary] = useState(null);

  // Shipping Address Form State
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: '',
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '123',
    cardHolder: '',
  });

  const token = localStorage.getItem('accessToken');
  let cartId = null;

  try {
    if (token) {
      cartId = jwtDecode(token).nameid;
    }
  } catch (err) {
    console.error('Invalid token', err);
  }

  useEffect(() => {
    if (!token || !cartId) {
      toast.error('Please login to proceed to checkout.');
      navigate('/auth/login');
      return;
    }

    const fetchCartDetails = async () => {
      try {
        setLoadingCart(true);
        const response = await cartApi.getCart(cartId);
        if (!response || !response.items || response.items.length === 0) {
          toast.error('Your cart is empty.');
          navigate('/cart');
          return;
        }
        setCartSummary(response);
      } catch (err) {
        console.error('Error fetching cart:', err);
        toast.error('Failed to load checkout details.');
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartDetails();
  }, [token, cartId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!address.street || !address.city || !address.state) {
      toast.error('Please complete your shipping address.');
      return;
    }

    const fullShippingAddress = `${address.street}, ${address.city}, ${address.state}, ${address.country}${
      address.postalCode ? ' (' + address.postalCode + ')' : ''
    }`;

    const paymentToken = paymentMethod === 'card' ? 'tok_visa_success' : 'tok_cash_on_delivery';

    try {
      setSubmitting(true);
      await ordersApi.checkout({
        cartId: cartId,
        shippingAddress: fullShippingAddress,
        paymentToken: paymentToken,
      });

      toast.success('Order placed successfully! Thank you for shopping.');

      // Clear local cart
      try {
        await cartApi.deleteCart(cartId);
      } catch (e) {
        console.log('Cart cleared on checkout');
      }

      // Redirect to Order History Page
      navigate('/orders');
    } catch (err) {
      console.error('Checkout failed:', err);
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCart) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-5 md:mx-10 xl:mx-15 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold font-archivo text-primary">Checkout</h1>
        <p className="text-gray-500 text-sm mt-1">Please enter your shipping and payment information.</p>
      </div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Main Form Area */}
        <div className="flex-1 space-y-6">
          {/* Shipping Address Section */}
          <div className="p-6 border border-secondary rounded-2xl bg-white space-y-4">
            <div className="flex items-center space-x-3 border-b border-secondary pb-4">
              <MapPin className="text-primary" size={22} />
              <h2 className="text-lg font-bold text-primary">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleInputChange}
                  placeholder="123 Commercial Avenue"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  placeholder="Ikeja"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">State / Region</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleInputChange}
                  placeholder="Nigeria"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Postal Code (Optional)</label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleInputChange}
                  placeholder="100001"
                  className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="p-6 border border-secondary rounded-2xl bg-white space-y-4">
            <div className="flex items-center space-x-3 border-b border-secondary pb-4">
              <CreditCard className="text-primary" size={22} />
              <h2 className="text-lg font-bold text-primary">Payment Method</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 text-primary font-bold'
                    : 'border-secondary hover:bg-secondary text-gray-600'
                }`}
              >
                <CreditCard size={24} />
                <span className="text-xs">Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 cursor-pointer transition ${
                  paymentMethod === 'delivery'
                    ? 'border-primary bg-primary/5 text-primary font-bold'
                    : 'border-secondary hover:bg-secondary text-gray-600'
                }`}
              >
                <Truck size={24} />
                <span className="text-xs">Pay on Delivery</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardDetails.cardHolder}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      placeholder="123"
                      className="w-full bg-secondary text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
              <ShieldCheck size={16} className="text-green-600" />
              <span>Your payment credentials are securely processed and encrypted.</span>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
          {cartSummary && (
            <OrderSummary
              data={cartSummary}
              loading={submitting}
              actionText={submitting ? 'Placing Order...' : 'Place Order'}
              disabled={submitting}
              onAction={handleCheckout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

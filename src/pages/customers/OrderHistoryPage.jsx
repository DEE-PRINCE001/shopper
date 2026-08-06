import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ordersApi } from '../../api';
import { Package, Calendar, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';

const statusConfig = {
  1: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  2: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  3: { label: 'Shipped', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  4: { label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200' },
  5: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200' },
  Pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  Processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  Shipped: { label: 'Shipped', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  Delivered: { label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200' },
  Cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200' },
};

const getStatusBadge = (status) => {
  const config = statusConfig[status] || {
    label: typeof status === 'string' ? status : 'Unknown',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${config.color}`}
    >
      {config.label}
    </span>
  );
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      toast.error('Please log in to view your orders.');
      navigate('/auth/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await ordersApi.getOrderHistory();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
        toast.error('Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-5 md:mx-10 xl:mx-15 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold font-archivo text-primary">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your order history.</p>
        </div>

        <Link
          to="/"
          className="text-xs md:text-sm font-semibold text-primary border border-secondary hover:bg-secondary px-4 py-2 rounded-full transition flex items-center space-x-1"
        >
          <span>Continue Shopping</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-4 border border-secondary rounded-2xl bg-white space-y-4">
          <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h3 className="text-xl font-bold text-primary">No orders found</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            You haven't placed any orders yet. Explore our top products and make your first purchase!
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div
              key={order.id || order.orderId || idx}
              className="border border-secondary rounded-2xl bg-white p-5 md:p-6 space-y-4 hover:shadow-sm transition"
            >
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-center gap-3 border-b border-secondary pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-secondary text-primary rounded-xl">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base md:text-lg">
                      Order #{order.id || order.orderId || `ORD-${idx + 1}`}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                      <Calendar size={14} />
                      <span>
                        {order.createdAt || order.orderDate
                          ? new Date(order.createdAt || order.orderDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Recent'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusBadge(order.status)}
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${Number(order.totalAmount || order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address & Details */}
              {order.shippingAddress && (
                <div className="flex items-start space-x-2 text-xs text-gray-600 bg-secondary/50 p-3 rounded-xl">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary">Shipping to: </span>
                    <span>{order.shippingAddress}</span>
                  </div>
                </div>
              )}

              {/* Order Items List */}
              {order.items && order.items.length > 0 && (
                <div className="divide-y divide-secondary/60">
                  {order.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="py-2.5 flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-bold text-xs shrink-0">
                          x{item.quantity || 1}
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{item.productName || item.name || 'Product'}</p>
                          {item.price && (
                            <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)} each</p>
                          )}
                        </div>
                      </div>

                      <div className="font-bold text-primary">
                        ${Number((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;

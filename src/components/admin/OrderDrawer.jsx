import { useState } from "react";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { ordersApi } from "../../api";
import toast from "react-hot-toast";

const statusToNumberMap = {
    Pending: 1,
    Processing: 2,
    Shipped: 3,
    Delivered: 4,
    Cancelled: 5,
};

const numberToStatusMap = {
    1: "Pending",
    2: "Processing",
    3: "Shipped",
    4: "Delivered",
    5: "Cancelled",
};

const OrderDrawer = ({
    open,
    order,
    status,
    setStatus,
    onClose,
    onRefresh,
}) => {
    const [submitting, setSubmitting] = useState(false);

    if (!open || !order) return null;

    const handleSaveStatus = async () => {
        const numericStatus = statusToNumberMap[status] || Number(status) || 1;
        const orderId = order.id || order.orderId;

        try {
            setSubmitting(true);
            await ordersApi.updateOrderStatus(orderId, { status: numericStatus });
            toast.success(`Order #${orderId} status updated to ${numberToStatusMap[numericStatus] || status}.`);
            if (onRefresh) onRefresh();
            onClose();
        } catch (err) {
            console.error("Failed to update status:", err);
            toast.error(err.response?.data?.message || "Failed to update order status.");
        } finally {
            setSubmitting(false);
        }
    };

    const displayStatus = typeof status === "number" ? numberToStatusMap[status] || "Pending" : status;

    return (
        <div className="fixed inset-0 z-50 bg-black/30">
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col justify-between">

                <div>
                    <div className="flex items-center justify-between border-b border-secondary p-6">
                        <h2 className="text-xl font-semibold text-primary">
                            Order #{order.id || order.orderId}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6 p-6 overflow-y-auto max-h-[calc(100vh-140px)]">

                        <div>
                            <h3 className="font-semibold text-primary text-sm">Customer</h3>
                            <p className="text-gray-800 text-sm">{order.customer || order.customerName || "Customer"}</p>
                            {order.email && <p className="text-gray-500 text-xs">{order.email}</p>}
                        </div>

                        <div>
                            <h3 className="font-semibold text-primary text-sm">Shipping Address</h3>
                            <p className="text-gray-700 text-sm">{order.address || order.shippingAddress || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold text-primary text-sm">Items</h3>
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="mb-2 flex justify-between text-sm border-b border-secondary/50 pb-2"
                                    >
                                        <span className="text-gray-800 font-medium">
                                            {item.name || item.productName || "Product"}
                                        </span>
                                        <span className="text-gray-500">x{item.quantity || 1}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-xs italic">No items details available.</p>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold text-primary text-sm">Total</h3>
                            <p className="text-xl font-bold text-primary">
                                ${Number(order.total || order.totalAmount || 0).toFixed(2)}
                            </p>
                        </div>

                        <Select
                            label="Order Status"
                            value={displayStatus}
                            onChange={(e) => setStatus(e.target.value)}
                            options={[
                                { value: "Pending", label: "Pending" },
                                { value: "Processing", label: "Processing" },
                                { value: "Shipped", label: "Shipped" },
                                { value: "Delivered", label: "Delivered" },
                                { value: "Cancelled", label: "Cancelled" },
                            ]}
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-secondary bg-white">
                    <Button
                        onClick={handleSaveStatus}
                        disabled={submitting}
                        className="w-full bg-primary text-white hover:bg-primary/90"
                    >
                        {submitting ? "Updating..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderDrawer;
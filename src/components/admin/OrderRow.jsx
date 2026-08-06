import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const OrderRow = ({ order, onView }) => {
    const orderId = order.id || order.orderId || "N/A";
    const customerName = order.customer || order.customerName || order.userEmail || "Customer";
    const formattedDate = order.date || order.createdAt || order.orderDate
        ? (order.date || new Date(order.createdAt || order.orderDate).toLocaleDateString())
        : "N/A";
    const totalAmount = typeof order.total === "number"
        ? order.total.toFixed(2)
        : typeof order.totalAmount === "number"
        ? order.totalAmount.toFixed(2)
        : order.total || order.totalAmount || "0.00";

    return (
        <tr className="border-b border-secondary last:border-none hover:bg-gray-50/50">
            <td className="px-6 py-4 font-medium text-primary">
                #{orderId}
            </td>

            <td className="px-6 py-4 text-gray-700">
                {customerName}
            </td>

            <td className="px-6 py-4 text-gray-500 text-sm">
                {formattedDate}
            </td>

            <td className="px-6 py-4 font-semibold text-primary">
                ${totalAmount}
            </td>

            <td className="px-6 py-4">
                <StatusBadge status={order.status} />
            </td>

            <td className="px-6 py-4">
                <ActionButtons
                    onView={() => onView(order)}
                />
            </td>
        </tr>
    );
};

export default OrderRow;
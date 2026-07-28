import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const OrderRow = ({ order, onView }) => {
    return (
        <tr className="border-b border-secondary last:border-none">
            <td className="px-6 py-4 font-medium">
                #{order.id}
            </td>

            <td className="px-6 py-4">
                {order.customer}
            </td>

            <td className="px-6 py-4">
                {order.date}
            </td>

            <td className="px-6 py-4">
                ${order.total}
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
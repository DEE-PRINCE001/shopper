import StatusBadge from "./StatusBadge";

const RecentOrdersTable = ({ orders = [] }) => {
    return (
        <div className="rounded-xl border border-secondary bg-white">
            <div className="border-b border-secondary p-5 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">
                    Recent Orders
                </h2>
                <span className="text-xs text-gray-500">{orders.length} order(s)</span>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-secondary text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Order</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.slice(0, 5).map((order, idx) => {
                            const orderId = order.id || order.orderId || `ORD-${idx + 1}`;
                            const customerName = order.customer || order.customerName || order.userEmail || "Customer";
                            const totalAmount = typeof order.total === "number"
                                ? order.total.toFixed(2)
                                : typeof order.totalAmount === "number"
                                ? order.totalAmount.toFixed(2)
                                : order.total || order.totalAmount || "0.00";

                            return (
                                <tr
                                    key={orderId}
                                    className="border-b border-secondary last:border-none hover:bg-gray-50/50 text-sm"
                                >
                                    <td className="p-4 font-medium text-primary">
                                        #{orderId}
                                    </td>

                                    <td className="p-4 text-gray-700">
                                        {customerName}
                                    </td>

                                    <td className="p-4 font-semibold text-primary">
                                        ${totalAmount}
                                    </td>

                                    <td className="p-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={4} className="p-6 text-center text-gray-400 text-sm">
                                No recent orders to display.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrdersTable;
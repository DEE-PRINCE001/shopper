const orders = [
    {
        id: "#1001",
        customer: "John Doe",
        total: "$120",
        status: "Pending",
    },
    {
        id: "#1002",
        customer: "Jane Smith",
        total: "$85",
        status: "Delivered",
    },
    {
        id: "#1003",
        customer: "Michael",
        total: "$245",
        status: "Processing",
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700";

        case "Pending":
            return "bg-yellow-100 text-yellow-700";

        case "Processing":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
};

const RecentOrdersTable = () => {
    return (
        <div className="rounded-xl border border-secondary bg-white">
            <div className="border-b border-secondary p-5">
                <h2 className="text-lg font-semibold">
                    Recent Orders
                </h2>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-secondary text-left">
                        <th className="p-4 font-medium">
                            Order
                        </th>

                        <th className="p-4 font-medium">
                            Customer
                        </th>

                        <th className="p-4 font-medium">
                            Total
                        </th>

                        <th className="p-4 font-medium">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="border-b border-secondary last:border-none"
                        >
                            <td className="p-4">
                                {order.id}
                            </td>

                            <td className="p-4">
                                {order.customer}
                            </td>

                            <td className="p-4">
                                {order.total}
                            </td>

                            <td className="p-4">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrdersTable;
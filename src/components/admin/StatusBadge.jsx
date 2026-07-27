const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "bg-yellow-100 text-yellow-700",

        Processing: "bg-blue-100 text-blue-700",

        Shipped: "bg-purple-100 text-purple-700",

        Delivered: "bg-green-100 text-green-700",

        Cancelled: "bg-red-100 text-red-700",

        Active: "bg-green-100 text-green-700",

        Inactive: "bg-gray-200 text-gray-600",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
                styles[status] || "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
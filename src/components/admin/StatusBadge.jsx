const statusMap = {
    1: { label: "Pending", style: "bg-yellow-100 text-yellow-700" },
    2: { label: "Processing", style: "bg-blue-100 text-blue-700" },
    3: { label: "Shipped", style: "bg-purple-100 text-purple-700" },
    4: { label: "Delivered", style: "bg-green-100 text-green-700" },
    5: { label: "Cancelled", style: "bg-red-100 text-red-700" },
};

const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-200 text-gray-600",
};

const StatusBadge = ({ status }) => {
    let label = status;
    let badgeStyle = "bg-gray-100 text-gray-700";

    if (typeof status === "number" && statusMap[status]) {
        label = statusMap[status].label;
        badgeStyle = statusMap[status].style;
    } else if (typeof status === "string" && styles[status]) {
        badgeStyle = styles[status];
    }

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle}`}
        >
            {label || "Pending"}
        </span>
    );
};

export default StatusBadge;
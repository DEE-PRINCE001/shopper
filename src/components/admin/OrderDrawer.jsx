import Button from "../ui/Button";
import Select from "../ui/Select";

const OrderDrawer = ({
    open,
    order,
    status,
    setStatus,
    onClose,
}) => {
    if (!open || !order) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30">
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-secondary p-6">

                    <h2 className="text-xl font-semibold">
                        Order #{order.id}
                    </h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <div className="space-y-6 p-6">

                    <div>
                        <h3 className="font-semibold">
                            Customer
                        </h3>

                        <p>{order.customer}</p>

                        <p className="text-gray-500">
                            {order.email}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Shipping Address
                        </h3>

                        <p>{order.address}</p>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold">
                            Items
                        </h3>

                        {order.items.map((item) => (
                            <div
                                key={item.name}
                                className="mb-2 flex justify-between"
                            >
                                <span>{item.name}</span>

                                <span>x{item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Total
                        </h3>

                        <p className="text-xl font-bold">
                            ${order.total}
                        </p>
                    </div>

                    <Select
                        label="Order Status"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        options={[
                            {
                                value: "Pending",
                                label: "Pending",
                            },
                            {
                                value: "Processing",
                                label: "Processing",
                            },
                            {
                                value: "Shipped",
                                label: "Shipped",
                            },
                            {
                                value: "Delivered",
                                label: "Delivered",
                            },
                            {
                                value: "Cancelled",
                                label: "Cancelled",
                            },
                        ]}
                    />

                    <Button className="w-full">
                        Save Changes
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default OrderDrawer;
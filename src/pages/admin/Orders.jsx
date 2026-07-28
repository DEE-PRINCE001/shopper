import { useState } from "react";

import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import OrderDrawer from "../../components/admin/OrderDrawer";
import OrderRow from "../../components/admin/OrderRow";

const orders = [
    {
        id: 1024,
        customer: "John Doe",
        email: "john@example.com",
        address: "12 Allen Avenue, Lagos",
        total: 180,
        status: "Pending",
        date: "24 Jul 2026",
        items: [
            {
                name: "Nike Air Max",
                quantity: 2,
            },
            {
                name: "Hoodie",
                quantity: 1,
            },
        ],
    },
];

const Orders = () => {
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const [status, setStatus] = useState("");

    return (
        <div className="space-y-6">

            <PageHeader
                title="Orders"
                search={search}
                setSearch={setSearch}
                buttonText="Refresh"
                onButtonClick={() => {}}
            />

            <DataTable
                columns={[
                    "Order ID",
                    "Customer",
                    "Date",
                    "Total",
                    "Status",
                    "Actions",
                ]}
            >
                {orders.map((order) => (
                    <OrderRow
                        key={order.id}
                        order={order}
                        onView={(selected) => {
                            setSelectedOrder(
                                selected
                            );

                            setStatus(
                                selected.status
                            );
                        }}
                    />
                ))}
            </DataTable>

            <Pagination
                page={page}
                totalPages={5}
                onPrevious={() =>
                    setPage((prev) =>
                        Math.max(prev - 1, 1)
                    )
                }
                onNext={() =>
                    setPage((prev) => prev + 1)
                }
            />

            <OrderDrawer
                open={selectedOrder !== null}
                order={selectedOrder}
                status={status}
                setStatus={setStatus}
                onClose={() =>
                    setSelectedOrder(null)
                }
            />

        </div>
    );
};

export default Orders;
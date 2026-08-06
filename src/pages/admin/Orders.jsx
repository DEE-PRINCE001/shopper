import { useEffect, useState, useCallback } from "react";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import OrderDrawer from "../../components/admin/OrderDrawer";
import OrderRow from "../../components/admin/OrderRow";
import { ordersApi } from "../../api";
import toast from "react-hot-toast";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");

    const pageSize = 10;

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const data = await ordersApi.getOrders();
            const orderList = Array.isArray(data) ? data : data?.orders || [];
            setOrders(orderList);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            toast.error("Failed to load admin orders.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Search filter
    const filteredOrders = orders.filter((order) => {
        if (!search.trim()) return true;
        const query = search.toLowerCase();
        const idStr = String(order.id || order.orderId || "").toLowerCase();
        const customerStr = String(order.customer || order.customerName || order.userEmail || "").toLowerCase();
        return idStr.includes(query) || customerStr.includes(query);
    });

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
    const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Orders"
                search={search}
                setSearch={setSearch}
                buttonText="Refresh"
                onButtonClick={fetchOrders}
            />

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white border border-secondary rounded-xl p-12 text-center text-gray-500">
                    {search ? "No orders matched your search query." : "No orders found."}
                </div>
            ) : (
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
                    {paginatedOrders.map((order, idx) => (
                        <OrderRow
                            key={order.id || order.orderId || idx}
                            order={order}
                            onView={(selected) => {
                                setSelectedOrder(selected);
                                setStatus(selected.status);
                            }}
                        />
                    ))}
                </DataTable>
            )}

            {filteredOrders.length > pageSize && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                    onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                />
            )}

            <OrderDrawer
                open={selectedOrder !== null}
                order={selectedOrder}
                status={status}
                setStatus={setStatus}
                onClose={() => setSelectedOrder(null)}
                onRefresh={fetchOrders}
            />
        </div>
    );
};

export default Orders;
import { useEffect, useState } from "react";
import {
    DollarSign,
    ShoppingBag,
    Package,
    Clock3,
} from "lucide-react";

import StatCard from "../../components/admin/StatCard";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable";
import { ordersApi, catalogApi } from "../../api";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const [ordersData, productsData] = await Promise.allSettled([
                    ordersApi.getOrders(),
                    catalogApi.getProducts({ PageSize: 100 }),
                ]);

                if (ordersData.status === "fulfilled") {
                    const list = Array.isArray(ordersData.value)
                        ? ordersData.value
                        : ordersData.value?.orders || [];
                    setOrders(list);
                }

                if (productsData.status === "fulfilled") {
                    const prodList = Array.isArray(productsData.value)
                        ? productsData.value
                        : productsData.value?.items || productsData.value?.products || [];
                    const totalProducts = productsData.value?.totalCount || prodList.length;
                    setProductsCount(totalProducts);
                }
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Calculate metrics
    const totalOrdersCount = orders.length;

    const totalRevenue = orders.reduce((sum, order) => {
        const amt = Number(order.total || order.totalAmount || 0);
        return sum + (isNaN(amt) ? 0 : amt);
    }, 0);

    const pendingOrdersCount = orders.filter((order) => {
        return (
            order.status === 1 ||
            order.status === "1" ||
            String(order.status).toLowerCase() === "pending"
        );
    }).length;

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Revenue"
                    value={loading ? "..." : `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                />

                <StatCard
                    title="Orders"
                    value={loading ? "..." : String(totalOrdersCount)}
                    icon={ShoppingBag}
                />

                <StatCard
                    title="Products"
                    value={loading ? "..." : String(productsCount)}
                    icon={Package}
                />

                <StatCard
                    title="Pending"
                    value={loading ? "..." : String(pendingOrdersCount)}
                    icon={Clock3}
                />
            </div>

            {/* Recent Orders */}
            {loading ? (
                <div className="flex justify-center items-center py-12 bg-white border border-secondary rounded-xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <RecentOrdersTable orders={orders} />
            )}
        </div>
    );
};

export default Dashboard;
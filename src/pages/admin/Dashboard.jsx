import {
    DollarSign,
    ShoppingBag,
    Package,
    Clock3,
} from "lucide-react";

import StatCard from "../../components/admin/StatCard";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable";

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Revenue"
                    value="$5,420"
                    icon={DollarSign}
                />

                <StatCard
                    title="Orders"
                    value="132"
                    icon={ShoppingBag}
                />

                <StatCard
                    title="Products"
                    value="48"
                    icon={Package}
                />

                <StatCard
                    title="Pending"
                    value="11"
                    icon={Clock3}
                />
            </div>

            <RecentOrdersTable />
        </div>
    );
};

export default Dashboard;
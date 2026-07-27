import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

const pageTitles = {
    "/admin": "Dashboard",
    "/admin/products": "Products",
    "/admin/categories": "Categories",
    "/admin/orders": "Orders",
};

const AdminLayout = () => {
    const { pathname } = useLocation();

    return (
        <div className="flex h-screen bg-secondary">
            <Sidebar />

            <main className="flex flex-1 flex-col overflow-hidden">
                <Header
                    title={
                        pageTitles[pathname] ??
                        "Admin"
                    }
                />

                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
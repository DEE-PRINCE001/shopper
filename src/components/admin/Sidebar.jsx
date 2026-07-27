import {
    LayoutDashboard,
    Package,
    Grid2x2,
    ShoppingBag,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        path: "/admin/products",
        icon: Package,
    },
    {
        name: "Categories",
        path: "/admin/categories",
        icon: Grid2x2,
    },
    {
        name: "Orders",
        path: "/admin/orders",
        icon: ShoppingBag,
    },
];

const Sidebar = () => {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-secondary bg-white">
            {/* Logo */}

            <div className="border-b border-secondary p-6">
                <h1 className="text-2xl font-bold">
                    Admin
                </h1>

                <p className="text-sm text-gray-500">
                    Clothing Store
                </p>
            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-2 p-4">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === "/admin"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "hover:bg-secondary"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}

            <div className="border-t border-secondary p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-secondary">
                    <LogOut size={20} />

                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
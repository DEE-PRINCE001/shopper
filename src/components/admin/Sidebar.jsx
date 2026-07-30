import {
    LayoutDashboard,
    Package,
    Grid2x2,
    ShoppingBag,
    LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

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
    
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth/login")
    }

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-secondary bg-primary">
            {/* Logo */}

            <div className="border-b border-secondary p-5">
                <h2 className="text-2xl text-white font-bold">
                    Admin
                </h2>

                <p className="text-sm text-secondary">
                    Shopper
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
                                        ? "bg-secondary text-primary"
                                        : "hover:bg-secondary/30 text-white"
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
                <button onClick={handleLogout} className="flex text-white w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-secondary">
                    <LogOut size={20} />

                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
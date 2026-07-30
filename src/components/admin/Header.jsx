import { Bell, Search } from "lucide-react";

const Header = ({ title }) => {
    return (
        <header className="flex items-center justify-between border-b border-secondary bg-primary px-8 py-5">
            <div>
                <h2 className="text-2xl text-white font-semibold">
                    {title}
                </h2>

                <p className="text-sm text-secondary">
                    Welcome back, Admin
                </p>
            </div>

            <div className="flex items-center gap-5">
                {/* Search */}

                <div className="relative hidden md:block">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 rounded-lg border border-secondary bg-secondary py-2 pl-10 pr-4 outline-none focus:border-primary"
                    />
                </div>

                {/* Notification */}

                <button className="rounded-lg border border-secondary bg-white p-2">
                    <Bell size={20} />
                </button>

                {/* Profile */}

                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-semibold text-primary">
                        A
                    </div>

                    <div className="hidden sm:block">
                        <p className="font-medium text-white">
                            Admin
                        </p>

                        <p className="text-sm text-secondary">
                            Administrator
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left */}

            <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-white">

                <div>
                    <h1 className="text-4xl font-bold">
                        Shopper
                    </h1>
                </div>

                <div className="max-w-md">

                    <h2 className="text-5xl font-bold">
                        Welcome Back.
                    </h2>

                    <p className="mt-6 text-lg text-white/80">
                        Shop any of your needs from our Multiple Categories
                    </p>

                </div>

                <p className="text-white/60">
                    © 2026 Shopper. All rights reserved.
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center justify-center bg-secondary p-6">

                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm">

                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;
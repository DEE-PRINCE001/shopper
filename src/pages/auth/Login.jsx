import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";

const Login = () => {
    return (
        <>
            <AuthHeader
                title="Sign In"
                subtitle="Welcome back! Please enter your details."
            />

            <form className="space-y-5">
                <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    leftIcon={Mail}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={Lock}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="accent-primary"
                        />

                        Remember me
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button className="w-full">
                    Sign In
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-primary"
                >
                    Create Account
                </Link>
            </p>
        </>
    );
};

export default Login;
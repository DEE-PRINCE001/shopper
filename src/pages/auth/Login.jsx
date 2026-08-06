import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { authApi } from '../../api';
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await authApi.login(formData);

            localStorage.setItem("accessToken", response.accessToken);
            if (response.refreshToken) {
                localStorage.setItem("refreshToken", response.refreshToken);
            }

            toast.success("Login successful! Welcome back.");

            let decoded = {};
            try {
                decoded = jwtDecode(response.accessToken);
            } catch (e) {
                console.error("Token decode error:", e);
            }

            const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            const errMsg = err.response?.data?.message || err.message || "Invalid credentials. Please try again.";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthHeader
                title="Sign In"
                subtitle="Welcome back! Please enter your details."
            />

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl mb-4 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email Address"
                    name={"email"}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    leftIcon={Mail}
                />

                <Input
                    label="Password"
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={Lock}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="accent-primary rounded"
                        />
                        Remember me
                    </label>

                    <Link
                        to="/auth/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Processing..." : "Sign In"}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/auth/register"
                    className="font-semibold text-primary hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </>
    );
};

export default Login;
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useState } from 'react';
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { authApi } from '../../api';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (passwordConfirm !== formData.password) {
            const errMsg = "The entered passwords do not match.";
            setError(errMsg);
            toast.error(errMsg);
            setLoading(false);
            return;
        }

        try {
            await authApi.register(formData);
            toast.success("Registration successful! Redirecting to login page...");
            setTimeout(() => {
                navigate("/auth/login");
            }, 1200);
        } catch (err) {
            console.error("Registration error:", err);
            const errMsg = err.response?.data?.message || err.message || "Registration failed. Please check your information.";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthHeader
                title="Create Account"
                subtitle="Create your account to start shopping."
            />

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl mb-4 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    type="text"
                    name={"firstName"}
                    value={formData.firstName}
                    label="First Name"
                    placeholder="John"
                    leftIcon={User}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Last Name"
                    type="text"
                    name={"lastName"}
                    value={formData.lastName}
                    placeholder="Doe"
                    leftIcon={User}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    name={"email"}
                    value={formData.email}
                    placeholder="john@example.com"
                    leftIcon={Mail}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name={"password"}
                    value={formData.password}
                    leftIcon={Lock}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Confirm Password"
                    name={"confirmPassword"}
                    value={passwordConfirm}
                    type="password"
                    leftIcon={Lock}
                    onChange={(e) => {
                        setError("");
                        setPasswordConfirm(e.target.value);
                    }}
                    required
                />

                <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        className="mt-1 accent-primary rounded"
                        required
                    />
                    <span>
                        I agree to the Terms & Conditions and Privacy Policy
                    </span>
                </label>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Processing..." : "Create Account"}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="font-semibold text-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </>
    );
};

export default Register;
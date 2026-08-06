import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { authApi } from '../../api';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);
        setError('');
        try {
            await authApi.forgotPassword(formData);
            toast.success("Reset link sent! Please check your email inbox.");
            navigate("/auth/reset-link-sent");
        } catch (err) {
            console.error("Forgot password error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to send reset link. Please check your email.";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthHeader
                title="Forgot Password"
                subtitle="Enter your email and we'll send a reset link."
            />

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl mb-4 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    leftIcon={Mail}
                    required
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm">
                <Link
                    to="/auth/login"
                    className="font-semibold text-primary hover:underline"
                >
                    Back to Login
                </Link>
            </p>
        </>
    );
};

export default ForgotPassword;
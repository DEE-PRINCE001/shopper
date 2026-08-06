import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { authApi } from '../../api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get('token') || '';

    const [formData, setFormData] = useState({ password: "" });
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
        if (passwordConfirm !== formData.password) {
            const errMsg = "The entered passwords do not match.";
            setError(errMsg);
            toast.error(errMsg);
            return;
        }

        setLoading(true);
        setError('');
        try {
            await authApi.resetPassword({
                token: tokenParam,
                newPassword: formData.password,
            });
            toast.success("Password reset successfully! Please login with your new password.");
            setTimeout(() => {
                navigate("/auth/login");
            }, 1200);
        } catch (err) {
            console.error("Reset password error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to reset password. Please request a new link.";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthHeader
                title="Reset Password"
                subtitle="Choose a new password for your account."
            />

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl mb-4 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="New Password"
                    type="password"
                    leftIcon={Lock}
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Confirm Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => {
                        setError("");
                        setPasswordConfirm(e.target.value);
                    }}
                    type="password"
                    leftIcon={Lock}
                    required
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
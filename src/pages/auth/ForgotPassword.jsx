import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";

const ForgotPassword = () => {
    return (
        <>
            <AuthHeader
                title="Forgot Password"
                subtitle="Enter your email and we'll send a reset link."
            />

            <form className="space-y-5">
                <Input
                    label="Email Address"
                    placeholder="john@example.com"
                    leftIcon={Mail}
                />

                <Button className="w-full">
                    Send Reset Link
                </Button>
            </form>

            <p className="mt-8 text-center text-sm">
                <Link
                    to="/login"
                    className="font-semibold text-primary"
                >
                    Back to Login
                </Link>
            </p>
        </>
    );
};

export default ForgotPassword;
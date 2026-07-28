import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";

const Register = () => {
    return (
        <>
            <AuthHeader
                title="Create Account"
                subtitle="Create your account to start shopping."
            />

            <form className="space-y-5">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    leftIcon={User}
                />

                <Input
                    label="Email Address"
                    placeholder="john@example.com"
                    leftIcon={Mail}
                />

                <Input
                    label="Password"
                    type="password"
                    leftIcon={Lock}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    leftIcon={Lock}
                />

                <label className="flex items-start gap-3 text-sm">
                    <input
                        type="checkbox"
                        className="mt-1 accent-primary"
                    />

                    <span>
                        I agree to the Terms &
                        Conditions and Privacy Policy
                    </span>
                </label>

                <Button className="w-full">
                    Create Account
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-primary"
                >
                    Sign In
                </Link>
            </p>
        </>
    );
};

export default Register;
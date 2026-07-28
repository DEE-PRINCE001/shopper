import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";

const ResetLinkSent = () => {
    return (
        <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                <MailCheck size={32} />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
                Check Your Email
            </h1>

            <p className="mt-3 text-gray-500">
                We've sent a password reset link to
                your email address.
            </p>

            <Link to="/login">
                <Button className="mt-8 w-full">
                    Back to Login
                </Button>
            </Link>
        </div>
    );
};

export default ResetLinkSent;
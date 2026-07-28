import { Lock } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";

const ResetPassword = () => {
    return (
        <>
            <AuthHeader
                title="Reset Password"
                subtitle="Choose a new password for your account."
            />

            <form className="space-y-5">
                <Input
                    label="New Password"
                    type="password"
                    leftIcon={Lock}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    leftIcon={Lock}
                />

                <Button className="w-full">
                    Reset Password
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
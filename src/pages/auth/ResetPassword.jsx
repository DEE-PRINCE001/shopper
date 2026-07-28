import { Lock } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { authApi } from '../../api'
import { useState } from 'react'

const ResetPassword = () => {

    const [formData, setFormData] = useState({ password: "" });
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("")


    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if (passwordConfirm != formData.password){
            setError("The entered password are different")
            console.log(error)
            return;
        }
        try {

            console.log(formData)
            authApi.resetPassword(formData)
        }
        catch (err) {
            setError(err);
            console.log(error);
            alert(error)
        }
    }


    return (
        <>
            <AuthHeader
                title="Reset Password"
                subtitle="Choose a new password for your account."
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="New Password"
                    type="password"
                    leftIcon={Lock}
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
                />

                <Input
                    label="Confirm Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => {
                        setError("")
                        setPasswordConfirm(e.target.value)
                    }}
                    type="password"
                    leftIcon={Lock}
                />

                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
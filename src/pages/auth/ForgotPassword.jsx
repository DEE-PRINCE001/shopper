import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import {authApi} from '../../api';
import {useState} from 'react'

const ForgotPassword = () => {

    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState("")


    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        try {
            console.log(formData)
            authApi.forgotPassword(formData)
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
                title="Forgot Password"
                subtitle="Enter your email and we'll send a reset link."
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    leftIcon={Mail}
                />

                <Button type="submit" className="w-full">
                    Send Reset Link
                </Button>
            </form>

            <p className="mt-8 text-center text-sm">
                <Link
                    to="/auth/login"
                    className="font-semibold text-primary"
                >
                    Back to Login
                </Link>
            </p>
        </>
    );
};

export default ForgotPassword;
import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import {authApi} from '../../api';
import {useState} from 'react'

const Login = () => {

    const [formData, setFormData] = useState({email: "", password: ""});
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
            authApi.login(formData)
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
                title="Sign In"
                subtitle="Welcome back! Please enter your details."
            />

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
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="accent-primary"
                        />

                        Remember me
                    </label>

                    <Link
                        to="/auth/forgot-password"
                        className="text-sm font-medium text-primary"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/auth/register"
                    className="font-semibold text-primary"
                >
                    Create Account
                </Link>
            </p>
        </>
    );
};

export default Login;
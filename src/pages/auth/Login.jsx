import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import {jwtDecode} from "jwt-decode"

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import {authApi} from '../../api';
import {useState} from 'react'

const Login = () => {

    const [formData, setFormData] = useState({"email": "", "password": ""});
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        try {

            // console.log(formData)

            const response = await authApi.login(formData)
            console.log(response)
            
            localStorage.setItem("accessToken", response.accessToken )
            localStorage.setItem("refreshToken", response.refreshToken )
            const decoded = jwtDecode(response.accessToken);
            if (decoded.role === "Admin"){
                navigate("/admin")
            }
            else {
                navigate("/")
            }
            alert("Login successful, you're now being directed to your dashboard")

        }
        catch (err) {
            setError(err);
            console.log(error);
            alert(error)
        }
        finally {
            setLoading(false)
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

                <Button type="submit" disabled={loading} className="w-full">
                    {loading? "Processing..." : "Sign In"}
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
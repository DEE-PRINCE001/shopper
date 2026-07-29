import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { useState } from 'react'

import {authApi} from '../../api'

const Register = () => {
   const [formData, setFormData] = useState({"firstName":"", "lastName":"", "email":"", "password":""});
   const [passwordConfirm, setPasswordConfirm] = useState("");
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();


    const handleChange = (e) => {
        setError("");
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        if (passwordConfirm != formData.password){
            setError("The entered password are different")
            alert("The entered password are different")
            setLoading(false)
            return;
        }
        try {
            
            // console.log(formData)
            const response = await authApi.register(formData)
            alert("Registration succesful, You are now being redirected to login page")
            navigate("/auth/login")
        }
        catch(err){
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
                title="Create Account"
                subtitle="Create your account to start shopping."
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    type="text"
                    name={"firstName"}
                    value={formData.firstName}
                    label="First Name"
                    placeholder="John Doe"
                    leftIcon={User}
                    onChange={handleChange}
                />
                <Input
                    label="Last Name"
                    type="text"
                    name={"lastName"}
                    value={formData.lastName}
                    placeholder="John Doe"
                    leftIcon={User}
                    onChange={handleChange}
                    
                />

                <Input
                    label="Email Address"
                    type="email"
                    name={"email"}
                    value={formData.email}
                    placeholder="john@example.com"
                    leftIcon={Mail}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    type="password"
                    name={"password"}
                    value={formData.password}
                    leftIcon={Lock}
                    onChange={handleChange}
                />

                <Input
                    label="Confirm Password"
                    name={"confirmPassword"}
                    value={passwordConfirm}
                    type="password"
                    leftIcon={Lock}
                    onChange={(e) => {
                        setError("");
                        setPasswordConfirm(e.target.value)
                    }}
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

                <Button type="submit" disabled={loading} className="w-full">
                    {loading? "Processing..." : "Create Account"}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="font-semibold text-primary"
                >
                    Sign In
                </Link>
            </p>
        </>
    );
};

export default Register;
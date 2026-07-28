import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthHeader from "../../components/auth/AuthHeader";
import { useState } from 'react'
import {authApi} from '../../api'

const Register = () => {
   const [formData, setFormData] = useState({firstName:"", lastName:"", email:"", password:""});
   const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("")


    const handleChange = (e) => {
        setError("");
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if (passwordConfirm != formData.password){
            setError("The entered password are different")
            alert(error)
            return;
        }
        try {
            
            console.log(formData)
            authApi.register(formData)
        }
        catch(err){
            setError(err);
            console.log(error);
            alert(error)
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

                <Button type="submit" className="w-full">
                    Create Account
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
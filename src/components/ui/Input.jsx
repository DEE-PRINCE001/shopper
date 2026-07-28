import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    className = "",
    textarea = false,
    rows = 4,
    leftIcon: LeftIcon,
    required = true,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                </label>
            )}

            {textarea ? (
                <textarea
                    rows={rows}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                    className={`w-full rounded-lg border border-secondary bg-white px-4 py-3 outline-none transition resize-none focus:border-primary ${className}`}
                />
            ) : (
                <div className="relative">
                    {LeftIcon && (
                        <LeftIcon
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                    )}

                    <input
                        type={inputType}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                        className={`w-full rounded-lg border border-secondary bg-white py-3 outline-none transition focus:border-primary ${
                            LeftIcon ? "pl-11" : "px-4"
                        } ${
                            type === "password"
                                ? "pr-11"
                                : "pr-4"
                        } ${className}`}
                    />

                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Input;
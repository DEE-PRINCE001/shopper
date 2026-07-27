const Button = ({
    children,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    onClick,
}) => {
    const variants = {
        primary:
            "bg-primary text-white hover:opacity-90",

        secondary:
            "bg-white border border-secondary text-black hover:bg-secondary",

        danger:
            "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                px-5
                py-2.5
                rounded-lg
                font-medium
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;
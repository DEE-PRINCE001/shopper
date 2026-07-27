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
}) => {
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
                    className={`w-full rounded-lg border border-secondary bg-white px-4 py-3 outline-none transition focus:border-primary resize-none ${className}`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`w-full rounded-lg border border-secondary bg-white px-4 py-3 outline-none transition focus:border-primary ${className}`}
                />
            )}
        </div>
    );
};

export default Input;
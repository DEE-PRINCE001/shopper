const Select = ({
    label,
    name,
    value,
    onChange,
    options = [],
    className = "",
}) => {

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                </label>
            )}

            <select
            name={name}
                value={value}
                onChange={onChange}
                className={`w-full rounded-lg border border-secondary bg-white px-4 py-3 outline-none transition focus:border-primary ${className}`}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
const SectionCard = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`rounded-xl border border-secondary bg-white ${className}`}
        >
            {children}
        </div>
    );
};

export default SectionCard;
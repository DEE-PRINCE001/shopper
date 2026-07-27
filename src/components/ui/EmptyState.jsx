const EmptyState = ({
    title,
    description,
}) => {
    return (
        <div className="rounded-xl border border-dashed border-secondary bg-white p-12 text-center">
            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-gray-500">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;
const StatCard = ({
    title,
    value,
    icon: Icon,
}) => {
    return (
        <div className="rounded-xl bg-white border border-secondary p-5 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    {value}
                </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
                <Icon size={24} />
            </div>
        </div>
    );
};

export default StatCard;
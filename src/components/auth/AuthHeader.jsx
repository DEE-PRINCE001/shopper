const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            <p className="mt-2 text-gray-500">
                {subtitle}
            </p>
        </div>
    );
};

export default AuthHeader;
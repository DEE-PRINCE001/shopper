import Input from "../ui/Input";
import Button from "../ui/Button";

const PageHeader = ({
    title,
    search,
    setSearch,
    buttonText,
    onButtonClick,
}) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage your {title.toLowerCase()}.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="sm:w-72"
                />

                <Button onClick={onButtonClick}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default PageHeader;
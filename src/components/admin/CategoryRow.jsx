import ActionButtons from "./ActionButtons";

const CategoryRow = ({
    category,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className="border-b border-secondary last:border-none">
            <td className="px-6 py-4">
                <img
                    src={category.image}
                    alt={category.name}
                    className="h-14 w-14 rounded-lg object-cover"
                />
            </td>

            <td className="px-6 py-4 font-medium">
                {category.name}
            </td>

            <td className="px-6 py-4 text-gray-500">
                {category.description}
            </td>

            <td className="px-6 py-4">
                {category.products}
            </td>

            <td className="px-6 py-4">
                <ActionButtons
                    onEdit={() => onEdit(category)}
                    onDelete={() => onDelete(category)}
                />
            </td>
        </tr>
    );
};

export default CategoryRow;
import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const ProductRow = ({
    loading,
    product,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className="border-b border-secondary last:border-none">
            <td className="px-6 py-4">
                <img
                    src={"https://placehold.co/60"}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg object-cover"
                />
            </td>

            <td className="px-6 py-4 font-medium">
                {product.name}
            </td>

            <td className="px-6 py-4">
                {product.categoryName}
            </td>

            <td className="px-6 py-4">
                ${product.price}
            </td>

            <td className="px-6 py-4">
                {product.stockQuantity}
            </td>

            <td className="px-6 py-4">
                <StatusBadge
                    status={"Active"}
                />
            </td>

            <td className="px-6 py-4">
                <ActionButtons
                    loading={loading}
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product)}
                />
            </td>
        </tr>
    );
};

export default ProductRow;
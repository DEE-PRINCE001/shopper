import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const ProductRow = ({
    product,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className="border-b border-secondary last:border-none">
            <td className="px-6 py-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg object-cover"
                />
            </td>

            <td className="px-6 py-4 font-medium">
                {product.name}
            </td>

            <td className="px-6 py-4">
                {product.category}
            </td>

            <td className="px-6 py-4">
                ${product.price}
            </td>

            <td className="px-6 py-4">
                {product.stock}
            </td>

            <td className="px-6 py-4">
                <StatusBadge
                    status={product.status}
                />
            </td>

            <td className="px-6 py-4">
                <ActionButtons
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product)}
                />
            </td>
        </tr>
    );
};

export default ProductRow;
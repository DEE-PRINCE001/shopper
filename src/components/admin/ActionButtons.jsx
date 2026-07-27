import { Eye, Pencil, Trash2 } from "lucide-react";

const ActionButtons = ({
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex items-center gap-2">
            {onView && (
                <button
                    onClick={onView}
                    className="rounded-lg p-2 transition hover:bg-secondary"
                >
                    <Eye size={18} />
                </button>
            )}

            {onEdit && (
                <button
                    onClick={onEdit}
                    className="rounded-lg p-2 transition hover:bg-secondary"
                >
                    <Pencil size={18} />
                </button>
            )}

            {onDelete && (
                <button
                    onClick={onDelete}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
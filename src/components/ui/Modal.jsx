import { X } from "lucide-react";

const Modal = ({
    open,
    onClose,
    title,
    children,
}) => {
    if (!open) return null;

    return (
        <div className="fixed max-h-[95%] overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-secondary p-5">
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
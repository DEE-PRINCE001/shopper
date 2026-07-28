import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="flex items-center justify-between border-t border-secondary bg-white px-6 py-4">
            <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
                <button
                    onClick={onPrevious}
                    disabled={page === 1}
                    className="rounded-lg border border-secondary p-2 disabled:opacity-40"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={onNext}
                    disabled={page === totalPages}
                    className="rounded-lg border border-secondary p-2 disabled:opacity-40"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
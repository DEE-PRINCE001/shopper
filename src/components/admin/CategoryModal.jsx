import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const CategoryModal = ({
    open,
    onClose,
    title,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-5">
                <Input
                    label="Category Name"
                    placeholder="Men's Wear"
                />

                <Input
                    textarea
                    label="Description"
                    placeholder="Category description..."
                />

                <Input
                    type="file"
                    label="Category Image"
                />

                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button>
                        Save Category
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CategoryModal;
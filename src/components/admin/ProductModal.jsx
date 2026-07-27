import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

const ProductModal = ({
    open,
    onClose,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Add Product"
        >
            <div className="space-y-5">

                <Input
                    label="Product Name"
                />

                <Input
                    label="Category"
                />

                <Input
                    label="Price"
                    type="number"
                />

                <Input
                    label="Stock Quantity"
                    type="number"
                />

                <Input
                    textarea
                    rows={5}
                    label="Description"
                />

                <Input
                    type="file"
                    label="Product Image"
                />

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button>
                        Save Product
                    </Button>

                </div>

            </div>
        </Modal>
    );
};

export default ProductModal;
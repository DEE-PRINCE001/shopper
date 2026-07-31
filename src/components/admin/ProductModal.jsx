import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { adminCatalogApi, catalogApi } from "../../api";
import LoadingState from "../ui/LoadingState";
import Select from "../ui/Select";



{/* name, description, price, stockQuantity, categoryId, imageUrl */ }

const ProductModal = ({
    edit,
    options,
    open,
    onClose,
}) => {

    const [loading, setLoading] = useState(false);


    const [formData, setFormdata] = useState({
        "id": "",
        "name": "",
        "description": "",
        "price": "",
        "stockQuantity": "",
        "categoryId": "",
        "imageUrl": ""
    });


    useEffect(() => {

        if (edit) {
            setFormdata({
                "id": edit.id ?? "",
                "name": edit.name ?? "",
                "description": edit.description ?? "",
                "price": edit.price ?? "",
                "stockQuantity": edit.stockQuantity ?? "",
                "categoryId": edit.categoryId ?? "",
                "imageUrl": ""
            });
        } else {
            setFormdata({
                "id": "",
                "name": "",
                "description": "",
                "price": "",
                "stockQuantity": "",
                "categoryId": "",
                "imageUrl": ""
            });
        }

    }, [edit]);


    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        // Image upload has not been implemented yet,
        // so imageUrl should always remain an empty string.
        if (name === "imageUrl") {
            setFormdata(prev => ({
                ...prev,
                imageUrl: ""
            }));

            return;
        }

        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSave = async (e) => {
        e.preventDefault();

        if (formData.categoryId.length < 2) {
            alert("Kindly choose a category, the Category section cannot be empty");
            return;
        }

        try {
            setLoading(true);

            const response = edit
                ? await adminCatalogApi.updateProduct(formData)
                : await adminCatalogApi.createProduct(
                    Object.fromEntries(
                        Object.entries(formData).slice(1)
                    )
                );

            console.log(response);

            setFormdata({
                "id": "",
                "name": "",
                "description": "",
                "price": "",
                "stockQuantity": "",
                "categoryId": "",
                "imageUrl": ""
            });

            onClose();

            alert(
                edit
                    ? "Product Updated Successfully"
                    : "Product Added successfully"
            );

        }
        catch (err) {
            console.log(err);

            alert(
                edit
                    ? "Failed to Update Product"
                    : "Failed to add product"
            );
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            title={edit ? "Edit Product" : "Add Product"}
        >
            <div className="space-y-5">

                <Input
                    name={"name"}
                    value={formData.name}
                    onChange={handleChange}
                    label="Product Name"
                />

                <Select
                    name={"categoryId"}
                    value={formData.categoryId}
                    onChange={handleChange}
                    label={"Category"}
                    options={[{ "label": "", "value": "" }, ...options]}
                />

                <Input
                    name={"price"}
                    value={formData.price}
                    onChange={handleChange}
                    label="Price"
                    type="number"
                />

                <Input
                    name={"stockQuantity"}
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    label="Stock Quantity"
                    type="number"
                />

                <Input
                    name={"description"}
                    value={formData.description}
                    onChange={handleChange}
                    textarea
                    rows={5}
                    label="Description"
                />

                <Input
                    type="file"
                    name={"imageUrl"}
                    onChange={handleChange}
                    label="Product Image"
                />

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Product"}
                    </Button>

                </div>

            </div>
        </Modal>
    );
};

export default ProductModal;
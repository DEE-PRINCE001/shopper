import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { adminCatalogApi } from "../../api";
import Select from "../ui/Select";
import toast from "react-hot-toast";

const ProductModal = ({
    edit,
    options = [],
    open,
    onClose,
    onRefresh,
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormdata] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (edit) {
            setFormdata({
                id: edit.id ?? "",
                name: edit.name ?? "",
                description: edit.description ?? "",
                price: edit.price ?? "",
                stockQuantity: edit.stockQuantity ?? "",
                categoryId: edit.categoryId ?? "",
                imageUrl: edit.imageUrl ?? ""
            });
            setSelectedImage(null);
        } else {
            setFormdata({
                id: "",
                name: "",
                description: "",
                price: "",
                stockQuantity: "",
                categoryId: "",
                imageUrl: ""
            });
            setSelectedImage(null);
        }
    }, [edit, open]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imageUrl") {
            setSelectedImage(files?.[0] ?? null);
            return;
        }

        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            return formData.imageUrl;
        }

        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", selectedImage);
            cloudinaryFormData.append("upload_preset", "shopper_products");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/ax0sfpfo/image/upload",
                {
                    method: "POST",
                    body: cloudinaryFormData
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            return data.secure_url;
        } catch (e) {
            console.error("Cloudinary upload error:", e);
            return formData.imageUrl || "/images/furniture.png";
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Product name is required.");
            return;
        }

        if (!formData.categoryId) {
            toast.error("Please select a category.");
            return;
        }

        try {
            setLoading(true);
            const imageUrl = await uploadImage();

            const productData = {
                ...formData,
                price: Number(formData.price || 0),
                stockQuantity: Number(formData.stockQuantity || 0),
                imageUrl: imageUrl
            };

            if (edit) {
                await adminCatalogApi.updateProduct(productData);
                toast.success("Product updated successfully!");
            } else {
                const { id, ...createPayload } = productData;
                await adminCatalogApi.createProduct(createPayload);
                toast.success("Product created successfully!");
            }

            if (onRefresh) onRefresh();
            onClose();
        } catch (err) {
            console.error("Save product error:", err);
            toast.error(err.response?.data?.message || (edit ? "Failed to update product." : "Failed to create product."));
        } finally {
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
                    required
                />

                <Select
                    name={"categoryId"}
                    value={formData.categoryId}
                    onChange={handleChange}
                    label={"Category"}
                    options={[{ label: "-- Select Category --", value: "" }, ...options]}
                    required
                />

                <Input
                    name={"price"}
                    value={formData.price}
                    onChange={handleChange}
                    label="Price ($)"
                    type="number"
                    required
                />

                <Input
                    name={"stockQuantity"}
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    label="Stock Quantity"
                    type="number"
                    required
                />

                <Input
                    name={"description"}
                    value={formData.description}
                    onChange={handleChange}
                    textarea
                    rows={4}
                    label="Description"
                />

                <Input
                    type="file"
                    name={"imageUrl"}
                    onChange={handleChange}
                    label="Product Image"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Product"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;

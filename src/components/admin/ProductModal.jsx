import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { adminCatalogApi, catalogApi } from "../../api";
import LoadingState from "../ui/LoadingState";
import Select from "../ui/Select";




{/* name, description, price, stockQuantity, categoryId, imageUrl */ }

const ProductModal = ({
    options,
    open,
    onClose,
}) => {

    const [loading, setLoading] = useState(false)


    const [formData, setFormdata] = useState({
        "name": "",
        "description": "",
        "price": "",
        "stockQuantity": "",
        "categoryId": "",
        "imageUrl": ""
    })
    let categories = []


    const handleChange = (e) => {
        e.preventDefault();
        setFormdata({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (formData.categoryId.length < 2){
            alert("Kindly choose a category, the Category section cannot be empty")
            return;
        }
        
        try {
            setLoading(true);
            console.log(formData)
            const response = await adminCatalogApi.createProduct(formData);
            console.log(response)

            setFormdata({
                "name": "",
                "description": "",
                "price": "",
                "stockQuantity": "",
                "categoryId": "",
                "imageUrl": ""
            });
            onClose()

            alert("Product Added successfully")

        }
        catch (err) {
            console.log(err)
            alert("Failed to add product")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Add Product"
        >
            <div className="space-y-5">

                <Input name={"name"}
                    value={formData.name}
                    onChange={handleChange}
                    label="Product Name"
                />

                <Select
                    name={"categoryId"}
                    value={formData.category}
                    onChange={handleChange}
                    label={"Category"}
                    options={[{"label":"", "value":""}, ...options]}
                />
                {/* <Input
                    name={category}
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                /> */}

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
                    value={formData.imageUrl}
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

                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Product"}
                    </Button>

                </div>

            </div>
        </Modal>
    );
};

export default ProductModal;
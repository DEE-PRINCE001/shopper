import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { adminCatalogApi } from "../../api";
import toast from "react-hot-toast";

const CategoryModal = ({ open, onClose, title }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", slug: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        setLoading(true);
        try {
            await adminCatalogApi.createCategory({
                name: formData.name.trim(),
                slug: formData.slug.trim() || formData.name.trim().toLowerCase().replace(/\s+/g, '-'),
            });
            setFormData({ name: "", slug: "" });
            toast.success("Category created successfully!");
            onClose();
        } catch (err) {
            console.error("Create category error:", err);
            toast.error(err.response?.data?.message || "Failed to create category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} title={title}>
            <div className="space-y-5">
                <Input
                    name={"name"}
                    value={formData.name}
                    onChange={handleChange}
                    label="Category Name"
                    placeholder="Electronics"
                    required
                />

                <Input
                    name={"slug"}
                    value={formData.slug}
                    onChange={handleChange}
                    label="Slug"
                    placeholder="electronics"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Category"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CategoryModal;
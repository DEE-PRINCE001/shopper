import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { adminCatalogApi } from "../../api";


const CategoryModal = ({
    open,
    onClose,
    title,
}) => {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({"name":"", "slug":""})

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminCatalogApi.createCategory(formData)
            setFormData({"name":"", "slug":""})
            alert("Category saved successfully")
            onClose()

        }
        catch(err){
            console.log(error)
            alert(error)
        }
        finally {

        setLoading(false)
            
        }

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-5">
                <Input
                name={"name"}
                value={formData.name}
                onChange={handleChange}
                    label="Category Name"
                    placeholder="Electronics"
                />

                <Input
                
                    name={"slug"}
                    value={formData.slug}
                    onChange={handleChange}
                    label="Slug"
                    placeholder="url-friendly version. eg: electronics"
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

                    <Button onClick={handleSave} disabled={loading} >
                        {loading? "Saving..." : "Save Category"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CategoryModal;
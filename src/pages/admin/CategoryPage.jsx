import { useState } from "react";

import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/admin/PageHeader";
import CategoryRow from "../../components/admin/CategoryRow";
import CategoryModal from "../../components/admin/CategoryModal";

const dummyCategories = [
    {
        id: 1,
        image: "https://placehold.co/60",
        name: "Men",
        description: "Men's fashion",
        products: 24,
    },
    {
        id: 2,
        image: "https://placehold.co/60",
        name: "Women",
        description: "Women's fashion",
        products: 31,
    },
];

const Categories = () => {
    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Categories"
                search={search}
                setSearch={setSearch}
                buttonText="Add Category"
                onButtonClick={() => setOpenModal(true)}
            />

            <DataTable
                columns={[
                    "Image",
                    "Category",
                    "Description",
                    "Products",
                    "Actions",
                ]}
            >
                {dummyCategories.map((category) => (
                    <CategoryRow
                        key={category.id}
                        category={category}
                        onEdit={() => setOpenModal(true)}
                        onDelete={() => {}}
                    />
                ))}
            </DataTable>

            <CategoryModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Add Category"
            />
        </div>
    );
};

export default Categories;
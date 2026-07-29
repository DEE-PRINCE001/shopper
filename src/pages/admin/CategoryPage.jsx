import { useEffect, useState } from "react";

import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/admin/PageHeader";
import CategoryRow from "../../components/admin/CategoryRow";
import CategoryModal from "../../components/admin/CategoryModal";
import { adminCatalogApi, catalogApi } from "../../api";
import LoadingState from "../../components/ui/LoadingState";

const dummyCategories = [
    {
        id: 1,
        image: "https://placehold.co/60",
        category: "Men",
        slug: "Men's fashion",
        // products: 24,
    },
    {
        id: 2,
        image: "https://placehold.co/60",
        category: "Women",
        slug: "Women's fashion",
        // products: 31,
    },
];

const Categories = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        
        const fetchCategories = async () =>{
            try {
                setLoading(true)
                const response = await catalogApi.getCategories();
                setCategories(response)
            }
            catch(err) {
                console.log(err)

            }
            finally{
                setLoading(false)
            }
        }
        fetchCategories();
    }, [])

    if (loading){
        return (
            <LoadingState/>
        )
    }

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
                    "Action"
                ]}
            >
                {categories.map((category) => (
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
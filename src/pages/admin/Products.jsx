import { useMemo, useState } from "react";

import PageHeader from "../../components/admin/PageHeader";
import ProductModal from "../../components/admin/ProductModal";
import ProductRow from "../../components/admin/ProductRow";

import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import Select from "../../components/ui/Select";

const products = [
    {
        id: 1,
        image: "https://placehold.co/60",
        name: "Nike Air Max",
        category: "Shoes",
        price: 120,
        stock: 18,
        status: "Active",
    },
    {
        id: 2,
        image: "https://placehold.co/60",
        name: "Denim Jacket",
        category: "Men",
        price: 95,
        stock: 10,
        status: "Active",
    },
    {
        id: 3,
        image: "https://placehold.co/60",
        name: "Women's Hoodie",
        category: "Women",
        price: 65,
        stock: 0,
        status: "Inactive",
    },
];

const Products = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);

    const [openModal, setOpenModal] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                !category ||
                product.category === category;

            const matchesStatus =
                !status ||
                product.status === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [search, category, status]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Products"
                search={search}
                setSearch={setSearch}
                buttonText="Add Product"
                onButtonClick={() =>
                    setOpenModal(true)
                }
            />

            <div className="flex flex-wrap gap-4">
                <Select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    options={[
                        {
                            value: "",
                            label: "All Categories",
                        },
                        {
                            value: "Shoes",
                            label: "Shoes",
                        },
                        {
                            value: "Men",
                            label: "Men",
                        },
                        {
                            value: "Women",
                            label: "Women",
                        },
                    ]}
                    className="w-52"
                />

                <Select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    options={[
                        {
                            value: "",
                            label: "All Status",
                        },
                        {
                            value: "Active",
                            label: "Active",
                        },
                        {
                            value: "Inactive",
                            label: "Inactive",
                        },
                    ]}
                    className="w-52"
                />
            </div>

            <DataTable
                columns={[
                    "Image",
                    "Name",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                ]}
            >
                {filteredProducts.map((product) => (
                    <ProductRow
                        key={product.id}
                        product={product}
                        onEdit={() =>
                            setOpenModal(true)
                        }
                        onDelete={() => {}}
                    />
                ))}
            </DataTable>

            <Pagination
                page={page}
                totalPages={8}
                onPrevious={() =>
                    setPage((prev) =>
                        Math.max(prev - 1, 1)
                    )
                }
                onNext={() =>
                    setPage((prev) => prev + 1)
                }
            />

            <ProductModal
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
            />
        </div>
    );
};

export default Products;
import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/admin/PageHeader";
import ProductModal from "../../components/admin/ProductModal";
import ProductRow from "../../components/admin/ProductRow";

import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import Select from "../../components/ui/Select";
import { adminCatalogApi, catalogApi } from "../../api";
import LoadingState from "../../components/ui/LoadingState";


// const products = [
//     {
//         id: 1,
//         image: "https://placehold.co/60",
//         name: "Nike Air Max",
//         category: "Shoes",
//         price: 120,
//         stock: 18,
//         status: "Active",
//     },
//     {
//         id: 2,
//         image: "https://placehold.co/60",
//         name: "Denim Jacket",
//         category: "Men",
//         price: 95,
//         stock: 10,
//         status: "Active",
//     },
//     {
//         id: 3,
//         image: "https://placehold.co/60",
//         name: "Women's Hoodie",
//         category: "Women",
//         price: 65,
//         stock: 0,
//         status: "Inactive",
//     },
// ];

const Products = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([])
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [response, setResponse] = useState([])
    const [edit, setEdit] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [reloadPage, setReloadPage] = useState(false);

    const [openModal, setOpenModal] = useState(false);




    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                setLoading(true)

                const response = await catalogApi.getProducts();
                const categories = await catalogApi.getCategories()
                // console.log(response)
                setProducts(response.items)

                const mappedOptions = categories.map((x) => {
                    return {
                        "label": x.name,
                        "value": x.id
                    }
                })

            

                setOptions(mappedOptions)


            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchProductsAndCategories()
    }, [reloadPage])

    const handleDelete = async (id) => {
        try {
                setDeleteLoading(true)
                console.log(id)
                const response = await adminCatalogApi.deleteProduct(id);
                console.log(response)
                setReloadPage((prev) => !prev)
                alert("Delete Successful");
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setDeleteLoading(false)
            }
    }



    const filteredProducts = useMemo(() => {
        // console.log("prod", products)
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory = !category ||
                product.categoryId === (category) ;

            const matchesStatus =
                !status ||
                "Active" === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [products, search, category, status]);


    if (loading) {
        return (
            <LoadingState />
        )
    }

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
                    options={[{"label":"All Categories", "value":""}, ...options]}
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
                    loading={deleteLoading}
                        key={product.id}
                        product={product}
                        onEdit={() =>{ 
                            setEdit(product)
                            setOpenModal(true)}
                        }
                        onDelete={() => handleDelete(product.id)}
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
                options={options}
                open={openModal}
                edit={edit}
                onClose={() =>{ 
                    setOpenModal(false)
                    setReloadPage((prev) => !prev)
                    setEdit(null)}
                }
            />
        </div>
    );
};

export default Products;
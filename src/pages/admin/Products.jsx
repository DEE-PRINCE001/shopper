import { useEffect, useMemo, useState, useCallback } from "react";
import PageHeader from "../../components/admin/PageHeader";
import ProductModal from "../../components/admin/ProductModal";
import ProductRow from "../../components/admin/ProductRow";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import Select from "../../components/ui/Select";
import { adminCatalogApi, catalogApi } from "../../api";
import toast from "react-hot-toast";

const Products = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const pageSize = 10;

    const fetchProductsAndCategories = useCallback(async () => {
        try {
            setLoading(true);
            const [prodResponse, catResponse] = await Promise.allSettled([
                catalogApi.getProducts({ PageSize: 100 }),
                catalogApi.getCategories(),
            ]);

            if (prodResponse.status === "fulfilled") {
                const list = Array.isArray(prodResponse.value)
                    ? prodResponse.value
                    : prodResponse.value?.items || prodResponse.value?.products || [];
                setProducts(list);
            }

            if (catResponse.status === "fulfilled") {
                const categories = Array.isArray(catResponse.value) ? catResponse.value : [];
                const mappedOptions = categories.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                }));
                setOptions(mappedOptions);
            }
        } catch (err) {
            console.error("Error loading products/categories:", err);
            toast.error("Failed to load catalog data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProductsAndCategories();
    }, [fetchProductsAndCategories]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            setDeleteLoading(true);
            await adminCatalogApi.deleteProduct(id);
            toast.success("Product deleted successfully.");
            fetchProductsAndCategories();
        } catch (err) {
            console.error("Delete product error:", err);
            toast.error(err.response?.data?.message || "Failed to delete product.");
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !category || String(product.categoryId) === String(category);
            const isStockActive = product.stockQuantity > 0;
            const matchesStatus =
                !status ||
                (status === "Active" && isStockActive) ||
                (status === "Inactive" && !isStockActive);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, search, category, status]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Products"
                search={search}
                setSearch={setSearch}
                buttonText="Add Product"
                onButtonClick={() => {
                    setEdit(null);
                    setOpenModal(true);
                }}
            />

            <div className="flex flex-wrap gap-4">
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[{ label: "All Categories", value: "" }, ...options]}
                    className="w-52"
                />

                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                        { value: "", label: "All Status" },
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                    ]}
                    className="w-52"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white border border-secondary rounded-xl p-12 text-center text-gray-500">
                    No products found.
                </div>
            ) : (
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
                    {paginatedProducts.map((product) => (
                        <ProductRow
                            loading={deleteLoading}
                            key={product.id}
                            product={product}
                            onEdit={() => {
                                setEdit(product);
                                setOpenModal(true);
                            }}
                            onDelete={() => handleDelete(product.id)}
                        />
                    ))}
                </DataTable>
            )}

            {filteredProducts.length > pageSize && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                    onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                />
            )}

            <ProductModal
                options={options}
                open={openModal}
                edit={edit}
                onClose={() => {
                    setOpenModal(false);
                    setEdit(null);
                }}
                onRefresh={fetchProductsAndCategories}
            />
        </div>
    );
};

export default Products;
import AdminLayout from "../layouts/AdminLayout";

<Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />

    <Route
        path="products"
        element={<Products />}
    />

    <Route
        path="categories"
        element={<Categories />}
    />

    <Route
        path="orders"
        element={<Orders />}
    />
</Route>
# 🛍️ Shopper — Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Shopper** is a high-performance, responsive e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**. It provides an end-to-end shopping experience for customers and a feature-rich administration dashboard for store owners.

---

## ✨ Features

### 🛒 Customer Storefront
* **Product Catalog & Collections**: Browse featured collections, new arrivals, and feeds with dynamic API filtering.
* **Global Search & Filter**: Real-time product search with keyword queries (`SearchTerm`) and category filtering.
* **Responsive Mobile Search**: Expandable mobile search bar with auto-focus and mobile drawer navigation.
* **Product Details View**: Dedicated product pages (`/products/:id`) featuring image galleries, stock status badges, rating breakdowns, and quantity controls.
* **Shopping Cart Management**: Add to cart, adjust item quantities, remove items, and clear the cart using [`cartApi`].
* **Seamless Checkout & Payment**: Integrated shipping address form, payment method selector (Card / Pay on Delivery), and checkout API integration ([`ordersApi.checkout`]).
* **Customer Order History**: Order history tracking (`/orders`) displaying item details, shipping address, and status badges.
* **Contact & Support**: Interactive contact page (`/contact`) with support cards, inquiry forms, and newsletter subscription.

### 🛡️ Admin Portal
* **Dashboard Analytics**: Live revenue metrics, order counts, product inventory counts, and pending order statistics.
* **Recent Orders Overview**: Live table displaying real-time customer orders.
* **Order Management & Status Drawer**: Inspect order items and update order statuses (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) via [`ordersApi.updateOrderStatus`].
* **Catalog & Category Management**: Create, edit, and delete products/categories with Cloudinary image upload support.

### 🔒 Authentication & Security
* **JWT Authentication**: Login, Register, Forgot Password, and Reset Password flows.
* **Automatic Token Refreshing**: Axios interceptor handling `401 Unauthorized` responses by automatically renewing access tokens via `/api/Auth/refresh-token`.
* **Toast Notifications**: Replaced browser popups with non-intrusive, styled notifications using `react-hot-toast`.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 18+ (Vite)
* **Styling**: Tailwind CSS v4, Custom CSS Variables (Design Tokens), Google Fonts (`Inter`, `Archivo Black`, `Lupio`)
* **Routing**: React Router DOM (v7)
* **HTTP Client**: Axios with Request/Response Interceptors
* **Icons**: Lucide React & React Icons (`fa`)
* **State & Utils**: JWT Decode, React Hot Toast, Custom Discount Calculators

---

## 📡 API Reference & Integration

The application integrates with the CoreCommerce REST API hosted at `https://shopper-k30n.onrender.com`.

| Module | Method | HTTP Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **`authApi`** | `register` | `POST /api/Auth/register` | Register new user account |
| | `login` | `POST /api/Auth/login` | Authenticate user & return JWT tokens |
| | `refreshToken` | `POST /api/Auth/refresh-token` | Renew expired access tokens |
| | `forgotPassword` | `POST /api/Auth/forgot-password` | Send password reset email |
| | `resetPassword` | `POST /api/Auth/reset-password` | Set new password with token |
| **`catalogApi`** | `getCategories` | `GET /api/catalog/categories` | Fetch list of product categories |
| | `getProducts` | `GET /api/catalog/products` | Query products with filters (`SearchTerm`, `CategoryId`, `MinPrice`, `MaxPrice`, `SortOrder`, `PageNumber`, `PageSize`) |
| **`cartApi`** | `getCart` | `GET /api/cart/{cartId}` | Fetch shopping cart by user ID |
| | `updateCartItem` | `PUT /api/cart/items` | Add or update item quantity in cart |
| | `deleteCart` | `DELETE /api/cart/{cartId}` | Clear cart contents |
| **`ordersApi`** | `checkout` | `POST /api/orders/checkout` | Submit order request |
| | `getOrderHistory` | `GET /api/orders/history` | Fetch authenticated customer orders |
| | `getOrders` | `GET /api/orders` | Fetch all system orders (Admin) |
| | `updateOrderStatus` | `PATCH /api/orders/{id}/status` | Update order status code (1 to 5) |
| **`adminCatalogApi`** | `createCategory` | `POST /api/admin/catalog/categories` | Create category (Admin) |
| | `createProduct` | `POST /api/admin/catalog/products` | Create product (Admin) |
| | `updateProduct` | `PUT /api/admin/catalog/products` | Update product details (Admin) |
| | `deleteProduct` | `DELETE /api/admin/catalog/products` | Delete product (Admin) |

---

## 📁 Repository Structure

```text
Shopper/
├── public/                  # Static assets and custom fonts
├── src/
│   ├── api/                 # API modules and Axios client
│   │   ├── adminCatalogApi.js
│   │   ├── apiClient.js     # Interceptor with token refresh
│   │   ├── authApi.js
│   │   ├── cartApi.js
│   │   ├── catalogApi.js
│   │   ├── index.js
│   │   └── ordersApi.js
│   ├── assets/              # Icons and images
│   ├── components/          # Reusable UI components
│   │   ├── admin/           # Admin layout tables, modals, & drawers
│   │   ├── auth/            # Auth headers and wrappers
│   │   ├── ui/              # Buttons, inputs, modals, data tables
│   │   ├── Cart.jsx
│   │   ├── CartSection.jsx
│   │   ├── Navbar.jsx       # Header with mobile search & nav
│   │   ├── OrderSummary.jsx
│   │   ├── Product.jsx
│   │   └── ProductSection.jsx
│   ├── layouts/             # Customer, Admin, and Auth layouts
│   ├── pages/               # Application pages
│   │   ├── admin/           # Dashboard, Products, Categories, Orders
│   │   ├── auth/            # Login, Register, Forgot/Reset Password
│   │   └── customers/       # Home, Cart, Checkout, Order History, Product Details, Contact
│   ├── utils/               # Discount calculations & helper functions
│   ├── App.jsx              # Main routing and Toaster config
│   ├── index.css            # Tailwind CSS v4 & theme variables
│   └── main.jsx             # React entrypoint
├── TODO.md                  # Project roadmap & implementation status
├── package.json             # Project dependencies and scripts
└── vite.config.js           # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18.x or higher
* npm v9.x or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DEE-PRINCE001/shopper.git
   cd shopper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

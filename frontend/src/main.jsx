import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import theme from "./app/theme.js";
import store from "./app/store.js";

import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Pages
import Error from "./routes/Error.jsx";
import Root from "./routes/Root.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Suppliers from "./routes/Suppliers/Suppliers.jsx";
import AddSuppliers from "./routes/Suppliers/AddSuppliers.jsx";
import Categories from "./routes/Categories/Categories.jsx";
import Products from "./routes/Products/Products.jsx";
import Media from "./routes/Media/Media.jsx";
import Sales from "./routes/Sales/ManageSales.jsx";
import AddProduct from "./routes/Products/AddProduct.jsx";
import AddSales from "./routes/Sales/AddSales.jsx";
import EditSupplier from "./routes/Suppliers/EditSupplier.jsx";
import EditCategories from "./routes/Categories/EditCategories.jsx";
import EditProduct from "./routes/Products/EditProduct.jsx";
import SalesReport from "./routes/Sales Report/SalesReport.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				errorElement: <Error />,
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
					{
						path: "/login",
						element: <h1>Login</h1>,
					},
					{
						path: "/suppliers",
						children: [
							{
								index: true,
								element: <Suppliers />,
							},
							{
								path: "create",
								element: <AddSuppliers />,
							},
							{
								path: "edit/:id",
								element: <EditSupplier />,
							},
						],
					},
					{
						path: "/categories",
						children: [
							{
								index: true,
								element: <Categories />,
							},
							{
								path: "edit/:id",
								element: <EditCategories />,
							},
						],
					},
					{
						path: "/products",
						children: [
							{
								index: true,
								element: <Products />,
							},
							{
								path: "create",
								element: <AddProduct />,
							},
							{
								path: "edit/:id",
								element: <EditProduct />,
							},
						],
					},
					{
						path: "/media",
						element: <Media />,
					},
					{
						path: "/sales",
						children: [
							{
								index: true,
								element: <Sales />,
							},
							{
								path: "create",
								element: <AddSales />,
							},
							{
								path: "edit/:id",
							},
						],
					},
					{
						path: "/sales-report",
						children: [
							{
								index: true,
								element: <SalesReport />,
							},
							{
								path: "monthly",
							},
							{
								path: "daily",
							},
						],
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<SnackbarProvider />
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);

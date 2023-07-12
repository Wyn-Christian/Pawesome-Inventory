import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ListActions from "../../components/ListActions";
import { PHPPrice, api_base_url } from "../../app/utils";
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from "../../app/services/product";

function Products() {
	const { data: products = [] } = useGetProductsQuery();
	const [deleteProduct] = useDeleteProductMutation();

	const columns = [
		{
			field: "media",
			headerName: "Photo",
			width: 140,
			renderCell: ({ row }) => {
				return (
					<Avatar
						sx={{ m: "auto" }}
						alt={row.media ? row.media.file_name : "none"}
						src={`${api_base_url}${row.media?.img_url}`}
					/>
				);
			},
		},
		{ field: "name", headerName: "Product Title", width: 250 },
		{
			field: "category",
			headerName: "Category",
			valueGetter: ({ row }) => {
				return row.category.name;
			},
			width: 250,
		},
		{
			field: "quantity",
			headerName: "In-Stock",
			width: 150,
			valueGetter: ({ row }) => {
				return `${row.quantity} ${row.unit}`;
			},
		},
		{
			field: "buy_price",
			headerName: "Buying Price",
			width: 200,
			valueFormatter: (params) => PHPPrice.format(params.value),
		},
		{
			field: "sale_price",
			headerName: "Selling Price",
			width: 200,
			valueFormatter: (params) => PHPPrice.format(params.value),
		},

		{
			field: "id",
			headerName: "Action",
			headerAlign: "center",
			width: 150,
			renderCell: (params) => (
				<ListActions
					to="products"
					params={params}
					deleteFunction={deleteProduct}
					name="Product"
				/>
			),
		},
	];

	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Add Product
			</Typography>
			<DataGrid
				rowHeight={55}
				rows={products}
				columns={columns}
				pageSizeOptions={[5, 10, 25]}
				initialState={{
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				sx={{
					boxShadow: 2,
					border: 1,
					backgroundColor: "white",
				}}
			/>
		</Box>
	);
}

export default Products;

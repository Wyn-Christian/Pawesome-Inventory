import { PHPPrice } from "../../app/utils";

import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import ListActions from "../../components/ListActions";
import {
	useDeleteSaleMutation,
	useGetSalesQuery,
} from "../../app/services/sale";
import { enqueueSnackbar } from "notistack";

function Sales() {
	const { data: sales = [] } = useGetSalesQuery();
	const [deleteSale] = useDeleteSaleMutation();

	const columns = [
		{
			field: "product_name",
			headerName: "Product Name",
			width: 200,
			valueGetter: ({ row }) => row.product?.name,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			width: 140,
			valueGetter: ({ row }) => `${row.quantity} ${row.product?.unit}`,
		},
		{
			field: "total_price",
			headerName: "Total",
			width: 200,
			valueGetter: ({ row }) =>
				` ${PHPPrice.format(row.price * row.quantity)}`,
		},

		{ field: "date_formatted", headerName: "Date", width: 140 },
		{
			field: "id",
			headerName: "Action",
			headerAlign: "center",
			width: 150,
			renderCell: (params) => (
				<ListActions
					to="sales"
					params={params}
					deleteFunction={deleteSale}
					name="Sale"
				/>
			),
		},
	];
	return (
		<Box>
			<Typography variant="h3" mb={3}>
				List of Sales
			</Typography>

			<DataGrid
				rowHeight={60}
				rows={sales}
				columns={columns}
				pageSizeOptions={[5, 10, 25]}
				initialState={{
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				sx={{
					boxShadow: 2,
					border: 1,
				}}
			/>
		</Box>
	);
}

export default Sales;

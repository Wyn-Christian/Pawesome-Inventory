import { useFormik } from "formik";

import Grid from "@mui/material/Unstable_Grid2";
import {
	Box,
	Button,
	Divider,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ListActions from "../../components/ListActions";
import {
	useCreateCategoryMutation,
	useGetCategoriesQuery,
} from "../../app/services/category";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

const columns = [
	{ field: "name", headerName: "Name", width: 250 },

	{
		field: "id",
		headerName: "Action",
		headerAlign: "center",
		width: 150,
		renderCell: (params) => (
			<ListActions to="categories" params={params} />
		),
	},
];

function Categories() {
	const { data: categories = [] } = useGetCategoriesQuery();
	const [addCategory] = useCreateCategoryMutation();

	const [CategoryField, setCategoryField] = useState("");

	const handleAddCategory = async () => {
		if (CategoryField) {
			await addCategory({
				name: CategoryField,
			}).then((res) => {
				console.log("Create Category Successfully", res);
				enqueueSnackbar("Create Category Successfully!", {
					variant: "success",
				}).catch((err) => console.error(err));
			});
		} else {
			enqueueSnackbar("Please input a valid value!");
		}
	};

	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Categories
			</Typography>
			<Grid container spacing={3}>
				<Grid xs={12} md={5}>
					<Paper>
						<Typography variant="h6" sx={{ px: 2, py: 1.5 }}>
							Add new Category
						</Typography>
						<Divider />
						<Box p={2}>
							<Stack spacing={3}>
								<TextField
									label="Category Name"
									fullWidth
									name="category"
									value={CategoryField}
									onChange={(e) => setCategoryField(e.target.value)}
								/>
								<Button
									sx={{ width: { xs: "100%", sm: "50%", md: "80%" } }}
									variant="contained"
									onClick={handleAddCategory}
								>
									Add Category
								</Button>
							</Stack>
						</Box>
					</Paper>
				</Grid>

				<Grid xs={12} md={7}>
					<DataGrid
						rowHeight={55}
						rows={categories}
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
				</Grid>
			</Grid>
		</Box>
	);
}

export default Categories;

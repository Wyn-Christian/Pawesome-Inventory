import { useNavigate, useParams } from "react-router-dom";
import {
	useGetCategoryQuery,
	useUpdateCategoryMutation,
} from "../../app/services/category";
import {
	Box,
	Button,
	Divider,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

function EditCategories() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [updateCategory] = useUpdateCategoryMutation();
	const {
		data: category = {},
		isLoading,
		isSuccess,
	} = useGetCategoryQuery(id);
	const [categoryValue, setCategoryValue] = useState("");

	useEffect(() => {
		setCategoryValue(category.name);
	}, [category]);

	const handleUpdateCategory = async () => {
		const data = {
			id,
			name: categoryValue,
		};
		console.log(data);
		await updateCategory(data)
			.unwrap()
			.then((res) => {
				enqueueSnackbar("Edit Category Successfully", {
					variant: "success",
				});
				navigate("/categories");
			});
	};

	let content;
	if (isLoading) {
		// content = <LoadingProgress />;
		content = <Box>Loading...</Box>;
	} else if (isSuccess) {
		content = (
			<Grid container spacing={3}>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Category
						</Typography>
						<Divider />
						<Stack p={2} spacing={3}>
							<TextField
								fullWidth
								label="Category"
								name="name"
								value={categoryValue}
								onChange={(e) => setCategoryValue(e.target.value)}
							/>
							<Button variant="contained" onClick={handleUpdateCategory}>
								Update Category
							</Button>
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		);
	}

	return (
		<div>
			<Typography variant="h3" mb={3}>
				Edit Category
			</Typography>
			{content}
		</div>
	);
}

export default EditCategories;

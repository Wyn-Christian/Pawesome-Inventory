import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import Grid from "@mui/material/Unstable_Grid2";
import {
	Box,
	Button,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useCreateProductMutation } from "../../app/services/product";
import { useGetMediasQuery } from "../../app/services/media";
import { enqueueSnackbar } from "notistack";
import { useGetCategoriesQuery } from "../../app/services/category";

function AddProduct() {
	const navigate = useNavigate();
	const [createProduct] = useCreateProductMutation();
	const { data: medias = [] } = useGetMediasQuery();
	const { data: categories = [] } = useGetCategoriesQuery();

	const formik = useFormik({
		initialValues: {
			name: "",
			quantity: 1,
			unit: "kg",
			buy_price: 100,
			sale_price: 100,
			media: "",
			category: "",
		},
	});

	const onSubmit = async () => {
		await createProduct(formik.values)
			.unwrap()
			.then((res) => {
				console.log("Create Product Successfully", res);
				enqueueSnackbar("Create Product Successfully!", {
					variant: "success",
				});
				navigate(`/products`);
			})
			.catch((err) => console.error(err));
	};
	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Add Product
			</Typography>
			<Grid container spacing={3}>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Basic info
						</Typography>
						<Divider />
						<Stack sx={{ p: 2 }} spacing={3}>
							<TextField
								fullWidth
								label="Product Title"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							<Stack direction="row" spacing={3}>
								<TextField
									fullWidth
									type="number"
									label="Quantity"
									name="quantity"
									value={formik.values.quantity}
									onChange={formik.handleChange}
								/>
								<TextField
									fullWidth
									label="Unit"
									name="unit"
									value={formik.values.unit}
									onChange={formik.handleChange}
								/>
							</Stack>
						</Stack>
					</Paper>
				</Grid>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Price
						</Typography>
						<Divider />
						<Stack sx={{ p: 2 }} spacing={3}>
							<TextField
								fullWidth
								type="number"
								label="Buying price"
								name="buy_price"
								value={formik.values.buy_price}
								onChange={formik.handleChange}
							/>
							<TextField
								fullWidth
								type="number"
								label="Selling Price"
								name="sale_price"
								value={formik.values.sale_price}
								onChange={formik.handleChange}
							/>
						</Stack>
					</Paper>
				</Grid>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Category
						</Typography>
						<Divider />
						<Box p={2}>
							<FormControl fullWidth>
								<InputLabel id="supplier-level-label">
									Choose Category
								</InputLabel>

								<Select
									labelId="supplier-level-label"
									label="Choose Category"
									name="category"
									value={formik.values.category}
									onChange={formik.handleChange}
								>
									{categories.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</Paper>
				</Grid>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Photo
						</Typography>
						<Divider />
						<Box p={2}>
							<FormControl fullWidth>
								<InputLabel id="supplier-level-label">Media</InputLabel>

								<Select
									labelId="supplier-level-label"
									label="Media"
									name="media"
									value={formik.values.media}
									onChange={formik.handleChange}
								>
									{medias.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.file_name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</Paper>
				</Grid>
				<Grid xs={12}>
					<Button variant="contained" onClick={onSubmit}>
						Add Supplier
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export default AddProduct;

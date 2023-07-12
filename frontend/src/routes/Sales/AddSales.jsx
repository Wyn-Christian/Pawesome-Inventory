import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import Grid from "@mui/material/Unstable_Grid2";
import {
	Autocomplete,
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
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetProductsQuery } from "../../app/services/product";
import { useEffect, useState } from "react";
import { PHPPrice } from "../../app/utils";

function AddSales() {
	const navigate = useNavigate();
	const { data: products = [] } = useGetProductsQuery();
	const [product, setProduct] = useState(null);
	const [total, setTotal] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const [inputValue, setInputValue] = useState("");
	const formik = useFormik({
		initialValues: {
			name: "",
			quantity: 1,
			stock: 0,
			sale_price: 0,
			total: 0,
			date: "",
		},
	});
	useEffect(() => {
		formik.setValues({
			name: product?.name,
			stock: product?.quantity,
			sale_price: product?.sale_price,
		});
	}, [product]);

	useEffect(() => {
		if (product) {
			formik.setValues({
				total: product?.quantity * product?.sale_price,
			});
		}
	}, [formik.values.quantity]);

	const handleQuantityChange = (e) => {
		if (product) {
			setQuantity(e.target.value);
			setTotal(quantity * product?.sale_price);
		} else {
			setTotal(0);
		}
	};

	return (
		<Box sx={{ mb: "20vh" }}>
			<Typography variant="h3" mb={3}>
				Add Sales
			</Typography>
			<Grid container spacing={3}>
				<Grid xs={12} md={4}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Search
						</Typography>
						<Divider />
						<Box p={2}>
							<Autocomplete
								value={product}
								onChange={(event, newValue) => {
									setProduct(newValue);
								}}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => {
									setInputValue(newInputValue);
								}}
								disablePortal
								options={products}
								getOptionLabel={(product) => product.name}
								renderInput={(params) => (
									<TextField fullWidth {...params} label="Products" />
								)}
							/>
						</Box>
					</Paper>
				</Grid>
				<Grid xs={12} md={8}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Product
						</Typography>
						<Divider />
						<Grid container spacing={3} px={3} py={2}>
							<Grid xs={12} md={6}>
								<TextField
									label="Product Item (read only)"
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									name="name"
									value={product ? product?.name : ""}
									onChange={formik.handleChange}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									label="Price"
									fullWidth
									name="sale_price"
									InputProps={{
										readOnly: true,
									}}
									value={
										product ? PHPPrice.format(product?.sale_price) : ""
									}
									onChange={formik.handleChange}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									label="Stock"
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									value={
										product ? `${product?.quantity} ${product?.unit}` : ""
									}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									label="Quantity"
									type="number"
									fullWidth
									value={quantity}
									onChange={(e) => handleQuantityChange(e)}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField label="Total" fullWidth value={total} />
							</Grid>
							<Grid xs={12} md={6}>
								<LocalizationProvider dateAdapter={AdapterLuxon}>
									<DatePicker label="Date" />
								</LocalizationProvider>
							</Grid>
							<Grid xs={12} sx={{ m: "auto" }}>
								<Button variant="contained">Add Sale</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}

export default AddSales;

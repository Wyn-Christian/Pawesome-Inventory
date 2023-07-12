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
import { useSignUpUserMutation } from "../../app/services/user";
import { enqueueSnackbar } from "notistack";
import { useGetUserGroupsQuery } from "../../app/services/user_group";

function AddSuppliers() {
	const navigate = useNavigate();
	const { data: user_groups = [] } = useGetUserGroupsQuery();
	const [signupUser] = useSignUpUserMutation();

	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			password: "",
			repassword: "",
			level: "",
			status: "Active",
		},
	});

	const onSubmit = async () => {
		const new_supplier = new FormData();
		new_supplier.append("name", formik.values.name);
		new_supplier.append("username", formik.values.username);
		new_supplier.append("password", formik.values.password);
		new_supplier.append("level", formik.values.level);
		new_supplier.append("status", formik.values.status);

		console.log(formik.values);

		await signupUser(formik.values)
			.unwrap()
			.then((res) => {
				enqueueSnackbar("Create Supplier Successfully!", {
					variant: "success",
				});
				navigate(`/suppliers`);
			})
			.catch((err) => console.error(err));
	};

	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Add Supplier
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
								label="Full Name"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							<TextField
								fullWidth
								label="Username"
								name="username"
								value={formik.values.username}
								onChange={formik.handleChange}
							/>
						</Stack>
					</Paper>
				</Grid>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Password
						</Typography>
						<Divider />
						<Stack sx={{ p: 2 }} spacing={3}>
							<TextField
								fullWidth
								label="Enter password"
								name="password"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							<TextField
								fullWidth
								label="Re-enter password"
								name="repassword"
								type="password"
								value={formik.values.repassword}
								onChange={formik.handleChange}
							/>
						</Stack>
					</Paper>
				</Grid>
				<Grid xs={12} md={6}>
					<Paper>
						<Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
							Supplier
						</Typography>
						<Divider />
						<Box p={2}>
							<FormControl fullWidth>
								<InputLabel id="supplier-level-label">Level</InputLabel>

								<Select
									labelId="supplier-level-label"
									name="level"
									label="level"
									value={formik.values.level}
									onChange={formik.handleChange}
								>
									{user_groups.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
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

export default AddSuppliers;

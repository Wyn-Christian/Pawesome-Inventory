import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";

import {
	useGetUserQuery,
	useUpdateUserMutation,
} from "../../app/services/user";

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
import { useGetUserGroupsQuery } from "../../app/services/user_group";
import LoadingProgress from "../../components/LoadingProgress";

function EditSupplier() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: user_groups = [] } = useGetUserGroupsQuery();
	const { data: user = {}, isLoading, isSuccess } = useGetUserQuery(id);
	const [updateUser] = useUpdateUserMutation();

	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			password: "",
			level: "",
			image: "",
			status: 1,
			last_login: "",
		},
	});

	useEffect(() => {
		if (isSuccess) {
			formik.setValues({
				name: user?.name,
				username: user?.username,
				level: user?.level,
				image: user?.image,
				status: user?.status,
				last_login: user?.last_login,
			});
		}
	}, [user, isSuccess]);

	const onSubmit = async () => {
		const new_data = new FormData();
		new_data.append("name", formik.values.name);
		new_data.append("username", formik.values.username);
		new_data.append("level", formik.values.level);
		new_data.append("status", formik.values.status);

		if (formik.values.password)
			new_data.append("password", formik.values.password);
		// await updateUser(new_data).unwrap();
		console.log(formik.values);

		enqueueSnackbar("Update Supplier Successfully!", {
			variant: "success",
		});
	};

	let content;
	if (isLoading) {
		// content = <LoadingProgress />;
		content = <Box>Loading...</Box>;
	} else if (isSuccess) {
		content = (
			<Box>
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
									name="username"
									label="Username"
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
									name="password"
									label="Enter password"
								/>
								<TextField
									fullWidth
									name="repassword"
									label="Re-enter password"
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
								<Stack spacing={3}>
									<FormControl fullWidth>
										<InputLabel id="supplier-level-label">
											Level
										</InputLabel>

										<Select
											labelId="supplier-level-label"
											label="level"
											name="level"
											displayEmpty
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
									<FormControl fullWidth>
										<InputLabel id="supplier-level-label">
											Status
										</InputLabel>

										<Select
											labelId="supplier-level-label"
											label="status"
											name="status"
											displayEmpty
											value={formik.values.status}
											onChange={formik.handleChange}
										>
											{["Active", "Deactive"].map((item) => (
												<MenuItem key={item} value={item}>
													{item}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Box>
						</Paper>
					</Grid>
					<Grid xs={12}>
						<Button variant="contained" onClick={onSubmit}>
							Update Supplier
						</Button>
					</Grid>
				</Grid>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Edit Supplier
			</Typography>
			{content}
		</Box>
	);
}

export default EditSupplier;

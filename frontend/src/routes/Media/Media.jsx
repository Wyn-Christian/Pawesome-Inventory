import { PHPPrice, api_base_url } from "../../app/utils";

import {
	Box,
	Button,
	Card,
	CardMedia,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import {
	useCreateMediaMutation,
	useDeleteMediaMutation,
	useGetMediasQuery,
} from "../../app/services/media";
import { enqueueSnackbar } from "notistack";
import { useFormik } from "formik";

const DeleteButton = ({ row }) => {
	const [deleteMedia] = useDeleteMediaMutation();

	const handleDelete = async () => {
		await deleteMedia(row.id)
			.unwrap()
			.then((res) =>
				enqueueSnackbar("Delete Media Successfully!", {
					variant: "success",
				})
			);
	};
	return (
		<Button
			color="error"
			variant="contained"
			sx={{ m: "auto" }}
			onClick={handleDelete}
		>
			<DeleteForeverIcon />
		</Button>
	);
};

const columns = [
	{
		field: "photo",
		headerName: "Photo",
		width: 250,
		renderCell: (params) => (
			<Card sx={{ m: "auto" }}>
				<CardMedia
					image={`${api_base_url}${params.row.img_url}`}
					sx={{ height: 140, width: 140 }}
				/>
			</Card>
		),
	},
	{ field: "file_name", headerName: "Photo Name", width: 200 },
	{ field: "file_type", headerName: "Photo Type", width: 140 },

	{
		field: "id",
		headerName: "Action",
		headerAlign: "center",
		width: 150,
		renderCell: (params) => <DeleteButton {...params} />,
	},
];
function Media() {
	const formik = useFormik({
		initialValues: {
			image: null,
		},
	});

	const [createMedia] = useCreateMediaMutation();

	const { data: medias = [] } = useGetMediasQuery();

	const handleAddMedia = async () => {
		const media = new FormData();

		if (formik.values.image !== null) {
			media.append("image", formik.values.image);

			await createMedia(media)
				.unwrap()

				.then((res) => {
					enqueueSnackbar("Create Media Successfully", {
						variant: "success",
					});
				})
				.catch((err) => console.log(err));
		} else {
			enqueueSnackbar("Please input valid value!");
		}
	};
	return (
		<Box>
			<Typography variant="h3" mb={3}>
				List of Media
			</Typography>
			<Paper sx={{ width: { xs: "100%", md: "56%" }, p: 2, mb: 3 }}>
				<Stack direction="row" spacing={3}>
					<MuiFileInput
						value={formik.values.image}
						onChange={(e) => formik.setFieldValue("image", e)}
					/>
					<Button variant="contained" onClick={handleAddMedia}>
						Add Media
					</Button>
				</Stack>
			</Paper>
			<DataGrid
				rowHeight={200}
				rows={medias}
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

export default Media;

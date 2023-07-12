import { Box, Button, ButtonGroup } from "@mui/material";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function ListActions({ to, params, deleteFunction, name }) {
	const handleDelete = async (id) => {
		await deleteFunction(id)
			.unwrap()
			.then((res) => {
				enqueueSnackbar(`Delete ${name} Successfully`, {
					variant: "success",
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<Box>
			<ButtonGroup variant="contained">
				<Button color="error" onClick={() => handleDelete(params.id)}>
					<DeleteForeverIcon />
				</Button>
				<Button LinkComponent={Link} to={`/${to}/edit/${params.id}`}>
					<EditNoteIcon />
				</Button>
			</ButtonGroup>
		</Box>
	);
}

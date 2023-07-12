import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../../app/services/user";

import {
	Box,
	Button,
	ButtonGroup,
	Chip,
	IconButton,
	Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import ListActions from "../../components/ListActions";

const CategoryInfo = ({ row }) => {
	let content;
	switch (row.level.name) {
		case "Admin":
			content = (
				<Chip sx={{ backgroundColor: "#C7E9B0" }} label={row.level.name} />
			);
			break;
		case "Special":
			content = (
				<Chip sx={{ backgroundColor: "#BAD1C2" }} label={row.level.name} />
			);
			break;
		case "User":
			content = (
				<Chip sx={{ backgroundColor: "#FFD495" }} label={row.level.name} />
			);
			break;
	}
	return <Box m="auto">{content}</Box>;
};

function Suppliers() {
	const { data: users = [] } = useGetUsersQuery();
	const [deleteUser] = useDeleteUserMutation();

	const columns = [
		{ field: "name", headerName: "Name", width: 150 },
		{
			field: "username",
			headerName: "Username",
			width: 140,
		},
		{
			field: "level",
			headerName: "Role",
			headerAlign: "center",
			width: 150,
			renderCell: (params) => <CategoryInfo {...params} />,
		},
		{ field: "status", headerName: "Status", width: 140 },
		{
			field: "last_login_formatted",
			headerName: "Last Login",
			width: 200,
		},
		{
			field: "id",
			headerName: "Action",
			headerAlign: "center",
			width: 150,
			renderCell: (params) => (
				<ListActions
					to="suppliers"
					params={params}
					deleteFunction={deleteUser}
					name="Supplier"
				/>
			),
		},
	];
	return (
		<Box>
			<Typography variant="h3" mb={3}>
				List of Suppliers
			</Typography>
			<DataGrid
				rowHeight={55}
				rows={users}
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

export default Suppliers;

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ViewAction = ({ to, params }) => {
	return (
		<Button
			LinkComponent={Link}
			to={`/admin/${to}/${params.id}`}
			variant="contained"
			sx={{ m: "auto" }}
			disableRipple
		>
			View
		</Button>
	);
};
export default ViewAction;

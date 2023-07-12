// Libraries
import { useRouteError } from "react-router-dom";

// MUI Components
import { Box, Container, Typography } from "@mui/material";

function Error() {
	const error = useRouteError();

	return (
		<Container>
			<Box sx={{ textAlign: "center" }}>
				<Typography variant="h2">Oops!</Typography>
				<Typography variant="h3">
					Sorry, an unexpected error has occurred.
				</Typography>
				<Typography>
					<i>{error.statusText || error.message}</i>
				</Typography>
			</Box>
		</Container>
	);
}

export default Error;

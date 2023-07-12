import { Outlet } from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";

import Navbar from "../components/Navbar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Root() {
	return (
		<Box>
			<CssBaseline />
			<Navbar>
				<Outlet />
			</Navbar>
		</Box>
	);
}

export default Root;

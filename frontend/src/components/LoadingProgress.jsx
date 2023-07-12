import { Box, CircularProgress } from "@mui/material";

function LoadingProgress({ size = 150 }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "40vh",
			}}
		>
			<CircularProgress size={size} />
		</Box>
	);
}

export default LoadingProgress;

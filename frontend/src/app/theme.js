import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
	// typography: {
	// 	fontFamily: "Helvetica Neue",
	// },
	palette: {
		mode: "dark",
		primary: {
			main: "#7ACBEE",
		},
		secondary: {
			main: "#432584",
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;

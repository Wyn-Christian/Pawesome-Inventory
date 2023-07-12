import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Icon,
	Paper,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useGetCountsQuery } from "../app/services/utils";

const SummaryTitle = ({ Icon, num, title, color }) => {
	return (
		<Grid xs={12} sm={6} md={3}>
			<Card
				elevation={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<CardContent sx={{ backgroundColor: color }}>
					<Icon
						sx={{
							fontSize: 50,
						}}
					/>
				</CardContent>
				<Box textAlign="center" flexGrow={1}>
					<Typography variant="h5">{num}</Typography>
					<Typography variant="body1">{title}</Typography>
				</Box>
			</Card>
		</Grid>
	);
};

function Dashboard() {
	const {
		data: counts = { suppliers: 0, categories: 0, products: 0, sales: 0 },
	} = useGetCountsQuery();
	return (
		<Box>
			<Typography variant="h3">Dashboard</Typography>
			<Grid container spacing={3}>
				<SummaryTitle
					Icon={PersonIcon}
					num={counts.suppliers}
					title="Suppliers"
					color="blue"
				/>
				<SummaryTitle
					Icon={CategoryIcon}
					num={counts.categories}
					title="Categories"
					color="blueviolet"
				/>
				<SummaryTitle
					Icon={ShoppingCartIcon}
					num={counts.products}
					title="Products"
					color="orange"
				/>
				<SummaryTitle
					Icon={ReceiptIcon}
					num={counts.sales}
					title="Sales"
					color="green"
				/>
			</Grid>
		</Box>
	);
}

export default Dashboard;

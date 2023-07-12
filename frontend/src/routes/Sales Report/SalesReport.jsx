import { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useCreateSalesByRangeMutation } from "../../app/services/utils";
import { PHPPrice } from "../../app/utils";

function SalesReport() {
	const [createSalesByRange] = useCreateSalesByRangeMutation();

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [salesReport, setSalesReport] = useState([]);

	const handleGenerate = async () => {
		if (startDate && endDate) {
			await createSalesByRange({
				start_date: startDate,
				end_date: endDate,
			})
				.unwrap()
				.then((res) => {
					setSalesReport(res);
					console.log(res);
				});
		}
	};

	return (
		<Box>
			<Typography variant="h3" mb={3}>
				Sales Report
			</Typography>
			<Stack direction="row" spacing={3}>
				<LocalizationProvider dateAdapter={AdapterLuxon}>
					<DatePicker
						label="Start Date"
						value={startDate}
						onChange={(newValue) => {
							setStartDate(newValue);
						}}
					/>
					<ChevronRightIcon sx={{ fontSize: 50 }} />
					<DatePicker
						label="End Date"
						value={endDate}
						onChange={(newValue) => {
							setEndDate(newValue);
						}}
					/>
				</LocalizationProvider>
				<Button onClick={handleGenerate}>generate</Button>
			</Stack>
			{!!salesReport.length && (
				<TableContainer
					component={Paper}
					sx={{ mt: 10, maxWidth: "70vw", mx: "auto" }}
				>
					<Table sx={{ minWidth: 700 }} aria-label="spanning table">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Product Title</TableCell>
								<TableCell align="right">Buying Price</TableCell>
								<TableCell align="right">Selling Price</TableCell>
								<TableCell align="right">Total Qty</TableCell>
								<TableCell align="right">TOTAL</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{salesReport.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.date_formatted}</TableCell>
									<TableCell>{row.product.name}</TableCell>
									<TableCell align="right">
										{PHPPrice.format(row.product.buy_price)}
									</TableCell>
									<TableCell align="right">
										{PHPPrice.format(row.product.sale_price)}
									</TableCell>
									<TableCell align="right">{row.quantity}</TableCell>
									<TableCell align="right">
										{PHPPrice.format(row.price)}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell rowSpan={5} />
								<TableCell align="right">GRAND TOTAL</TableCell>
								<TableCell align="right">
									{PHPPrice.format(
										salesReport.reduce(
											(total, current) => current.price + total,
											0
										)
									)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="right">PROFIT</TableCell>
								<TableCell align="right">
									{PHPPrice.format(
										salesReport.reduce((total, current) => {
											return (
												(current.product.sale_price -
													current.product.buy_price) *
													current.quantity +
												total
											);
										}, 0)
									)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	);
}

export default SalesReport;

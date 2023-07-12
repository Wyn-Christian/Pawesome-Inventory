import { useState } from "react";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { drawerWidth } from "../app/utils";

import {
	AppBar,
	Avatar,
	Box,
	Chip,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import CreateIcon from "@mui/icons-material/Create";
import PetsIcon from "@mui/icons-material/Pets";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodayIcon from "@mui/icons-material/Today";

const SingleNavLink = ({ text, link, Icon, handleDrawerToggle }) => {
	return (
		<ListItem disablePadding>
			<ListItemButton
				LinkComponent={Link}
				to={link}
				onClick={handleDrawerToggle}
			>
				<ListItemIcon>
					<Icon color="primary" />
				</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
};

const NestedNavLinks = ({ text, items, Icon, handleDrawerToggle }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List disablePadding>
			<ListItem disablePadding>
				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
						<Icon color="primary" />
					</ListItemIcon>
					<ListItemText primary={text} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List
					component="div"
					disablePadding
					sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
				>
					{items.map((item) => (
						<ListItemButton
							key={item.title}
							sx={{ pl: 3.5 }}
							LinkComponent={Link}
							to={item.link}
							onClick={handleDrawerToggle}
						>
							<ListItemIcon>
								<item.icon color="primary" />
							</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</List>
	);
};

const AdminDrawer = ({ handleDrawerToggle }) => {
	const handleLogoutClick = () => {
		enqueueSnackbar("Admin Logout Successfully!", {
			variant: "success",
		});
	};
	return (
		<div>
			<Toolbar>
				<Typography fontSize={20}>PAWESOME PET FOOD STORE</Typography>
			</Toolbar>
			<Divider />
			<Box sx={{ overflow: "auto" }}>
				<List>
					<SingleNavLink
						text="Dashboard"
						link="/"
						Icon={DashboardIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>
					{/* 
          <NestedNavLinks
            text="Supplier Management"
            items={[
              {
                title: "Manage Suppliers",
                icon: ViewListIcon,
                link: "/suppliers",
              },
              {
                title: "Add Supplier",
                icon: CreateIcon,
                link: "/suppliers/create",
              },
            ]}
            Icon={PermIdentityIcon}
            handleDrawerToggle={handleDrawerToggle}
          /> */}

					<SingleNavLink
						text="Categories"
						link="/categories"
						Icon={CategoryIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>

					<NestedNavLinks
						text="Products"
						items={[
							{
								title: "Manage Products",
								icon: ViewListIcon,
								link: "/products",
							},
							{
								title: "Add Products",
								icon: CreateIcon,
								link: "/products/create",
							},
						]}
						Icon={PetsIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>

					<SingleNavLink
						text="Media Files"
						link="/media"
						Icon={PermMediaIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>

					<NestedNavLinks
						text="Sales"
						items={[
							{
								title: "Manage Sales",
								icon: ViewListIcon,
								link: "/sales",
							},
							{
								title: "Add Sale",
								icon: CreateIcon,
								link: "/sales/create",
							},
						]}
						Icon={CreditCardIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>

					<NestedNavLinks
						text="Sales Report"
						items={[
							{
								title: "Sales by dates",
								icon: DateRangeIcon,
								link: "/sales-report",
							},
							// {
							// 	title: "Monthly Sale",
							// 	icon: CalendarMonthIcon,
							// 	link: "/sales-report/monthly",
							// },
							// {
							// 	title: "Daily Sale",
							// 	icon: TodayIcon,
							// 	link: "/sales-report/daily",
							// },
						]}
						Icon={ReceiptIcon}
						handleDrawerToggle={handleDrawerToggle}
					/>
				</List>
			</Box>
		</div>
	);
};

function Navbar({ children }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box display="flex">
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					{/* <Box flexGrow={1}>
						<Typography>time</Typography>
					</Box>
					<Box>
						<Chip
							avatar={
								<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
							}
							label="Avatar"
							variant="outlined"
							onClick={handleClick}
						/>
					</Box> */}
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
					display: { xs: "none", sm: "block" },
				}}
				open
			>
				<AdminDrawer />
			</Drawer>
			{/* Mobile */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					[`& .MuiDrawer-paper`]: {
						boxSizing: "border-size",
						width: drawerWidth,
					},
				}}
			>
				<AdminDrawer handleDrawerToggle={handleDrawerToggle} />
			</Drawer>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					paddingX: 3,
					pt: 2,
					width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}

export default Navbar;

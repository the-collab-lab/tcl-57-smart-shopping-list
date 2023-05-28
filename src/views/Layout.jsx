import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
	Container,
	Typography,
	Paper,
	AppBar,
	Toolbar,
	Breadcrumbs,
	Box,
	IconButton,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import './Layout.css';

export function Layout({ listToken }) {
	//TO DO: Refactor NavBar into a separate component
	//TO DO: Refactor styling of NavLinks using JS instead of CSS
	const [anchorElNav, setAnchorElNav] = useState(null);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useTheme();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<Paper sx={{ minHeight: '100dvh' }}>
			<Container
				maxWidth="false"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '100%',
					minHeight: '100%',
					bgcolor: prefersDarkMode ? 'inherit' : theme.palette.secondary.light,
				}}
			>
				{/* App Bar begins here */}
				<Container maxWidth="xl" sx={{ p: '0' }} disableGutters>
					{/* TODO: enable color on dark? */}
					<AppBar
						position="relative"
						sx={{
							backgroundColor: prefersDarkMode
								? theme.palette.primary.dark
								: theme.palette.primary.main,
						}}
					>
						<Container maxWidth="xl">
							<Toolbar disableGutters>
								{/* This is the title displayed on the left for medium to large screen sizes */}
								<BakeryDiningIcon sx={{ mr: 1 }} fontSize="large" />
								<Typography
									variant="h3"
									sx={{
										mr: 2,
										flexGrow: 1,
										fontFamily: 'monospace',
										fontWeight: 700,
										letterSpacing: '.3rem',
										color: 'inherit',
										textDecoration: 'none',
									}}
								>
									Smart Shopping List
								</Typography>

								{/* This is the App Icon Menu */}
								{listToken ? (
									<Box
										sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
									>
										<IconButton
											size="large"
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleOpenNavMenu}
											color="inherit"
										>
											<MenuIcon />
										</IconButton>

										{/* This is the menu displayed after clicking on the icon */}
										<Menu
											id="menu-appbar"
											anchorEl={anchorElNav}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'left',
											}}
											open={Boolean(anchorElNav)}
											onClose={handleCloseNavMenu}
											sx={{
												display: { xs: 'block', md: 'none' },
											}}
										>
											<MenuItem onClick={handleCloseNavMenu}>
												<NavLink to="/list" className="Menu-nav-link">
													List
												</NavLink>
											</MenuItem>

											<MenuItem onClick={handleCloseNavMenu}>
												<NavLink to="/add-item" className="Menu-nav-link">
													Add Item
												</NavLink>
											</MenuItem>
										</Menu>
									</Box>
								) : (
									<Box></Box>
								)}

								{/* These are the Nav Links that display on right side for medium and large screens*/}
								{listToken ? (
									<Breadcrumbs
										aria-label="breadcrumb"
										color="white"
										separator=""
										sx={{ display: { xs: 'none', md: 'block' } }}
									>
										<NavLink to="/list" className="Nav-link">
											List
										</NavLink>
										<NavLink to="/add-item" className="Nav-link">
											Add Item
										</NavLink>
									</Breadcrumbs>
								) : (
									<Breadcrumbs></Breadcrumbs>
								)}
							</Toolbar>
						</Container>
					</AppBar>
				</Container>

				{/* Main content area for each page */}
				<Container
					maxWidth="xl"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						pt: '25px',
						pb: '50px',
						mb: '25px',
						bgcolor: prefersDarkMode ? 'inherit' : 'white',
					}}
				>
					<main>
						<Outlet />
					</main>
				</Container>
			</Container>
		</Paper>
	);
}

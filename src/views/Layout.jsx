import { NavLink, Outlet } from 'react-router-dom';
import {
	Container,
	Typography,
	Paper,
	AppBar,
	Toolbar,
	Breadcrumbs,
	Box,
	IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Layout.css';

export function Layout({ listToken }) {
	return (
		<Paper sx={{ minHeight: '100dvh' }}>
			<Container
				maxWidth="false"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '100%',
					minHeight: '100%',
				}}
			>
				<Container maxWidth="xl" sx={{ p: '0' }} disableGutters>
					<AppBar position="relative">
						<Container maxWidth="xl">
							<Toolbar sx={{ justifyContent: 'space-between' }}>
								{/* This is the title displayed on the left for medium to large screen sizes */}
								<Typography
									variant="h5"
									noWrap
									component="a"
									href="/"
									sx={{
										mr: 2,
										display: { xs: 'none', md: 'flex' },
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

								<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										// onClick={handleOpenNavMenu}
										color="inherit"
									>
										<MenuIcon />
									</IconButton>
								</Box>

								{/* These are the Nav Links */}
								{listToken ? (
									<div>
										<Breadcrumbs
											aria-label="breadcrumb"
											color="white"
											separator=""
										>
											<NavLink to="/list" className="Nav-link">
												List
											</NavLink>
											<NavLink to="/add-item" className="Nav-link">
												Add Item
											</NavLink>
										</Breadcrumbs>
									</div>
								) : (
									<div></div>
								)}

								{/* This is the title displayed on the right for mobile version */}
								<Typography
									variant="h6"
									noWrap
									component="a"
									sx={{
										mr: 2,
										display: { xs: 'flex', md: 'none' },
										justifyContent: 'right',
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

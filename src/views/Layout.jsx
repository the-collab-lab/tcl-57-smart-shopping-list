import { NavLink, Outlet } from 'react-router-dom';
import {
	Container,
	Typography,
	Paper,
	AppBar,
	Toolbar,
	Breadcrumbs,
} from '@mui/material';
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
								{listToken ? (
									<div>
										{/* Consider using drawer or nav icon for mobile screen size */}
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

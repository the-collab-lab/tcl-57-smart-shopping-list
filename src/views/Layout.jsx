import { NavLink, Outlet } from 'react-router-dom';
import {
	Container,
	Typography,
	Paper,
	AppBar,
	Toolbar,
	Breadcrumbs,
	Link,
	Menu,
	MenuItem,
	Box,
	Button,
	IconButton,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import './Layout.css';

//Note: color is used for visualization purpose only. Will change colors of app features later in development of app styling.

export function Layout() {
	return (
		<>
			<Container maxWidth="false" sx={{ bgcolor: '#739C83' }}>
				<AppBar position="relative">
					<Container maxWidth="xl">
						<Toolbar>
							<Typography
								variant="h6"
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

							<div>
								<Breadcrumbs aria-label="breadcrumb">
									<Link underline="hover" color="inherit" href="/">
										Home
									</Link>
									<Link
										underline="hover"
										color="inherit"
										href="/material-ui/getting-started/installation/"
									>
										List
									</Link>
									<Typography color="text.primary">Add Item</Typography>
								</Breadcrumbs>
							</div>
						</Toolbar>
					</Container>
				</AppBar>

				{/* <Container
					maxWidth="lg"
					sx={{ bgcolor: '#cfe8fc', display: 'flex', justifyContent: 'left' }}
				>
					<header className="Layout-header">
						<nav className="Nav">
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</nav>
						<Typography variant="h3" gutterBottom>
							Smart shopping list
						</Typography>
					</header> */}
				{/* </Container> */}
				{/* <Paper> */}

				<Container
					maxWidth="lg"
					sx={{
						bgcolor: '#DDECA9',
						display: 'flex',
						justifyContent: 'center',
						height: '100vh',
						pt: '25px',
					}}
				>
					<main className="Layout-main">
						<Outlet />
					</main>
				</Container>

				{/* </Paper> */}
			</Container>
		</>
	);
}

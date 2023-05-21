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
// import { flexbox } from '@mui/system'
// import MenuIcon from '@mui/icons-material/Menu';
// import './Layout.css';

//Note: color is used for visualization purpose only. Will change colors of app features later in development of app styling.

export function Layout() {
	return (
		<>
			<Container
				maxWidth="false"
				sx={{ bgcolor: '#739C83', display: 'flex', flexDirection: 'column' }}
			>
				<Container maxWidth="lg" sx={{ p: '0' }}>
					<AppBar position="relative">
						<Container maxWidth="xl">
							<Toolbar>
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

								<div>
									<Breadcrumbs aria-label="breadcrumb">
										<NavLink to="/" className="Nav-link">
											Home
										</NavLink>
										<NavLink to="/list" className="Nav-link">
											List
										</NavLink>
										<NavLink to="/add-item" className="Nav-link">
											Add Item
										</NavLink>

										{/* <Link underline="hover" color="inherit" href="/">
										Home
									</Link>
									<Link underline="hover" color="inherit" href="/list">
										List
									</Link>
									<Link underline="hover" color="inherit" href="/add-item">
										Add Item
									</Link> */}
									</Breadcrumbs>
								</div>

								<Typography
									variant="h6"
									noWrap
									component="a"
									href=""
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

				{/* <Container
					maxWidth="lg"
					sx={{ bgcolor: '#cfe8fc', display: 'flex', justifyContent: 'left' }}
				>
				
					<header className="Layout-header">
						
						<Breadcrumbs aria-label="breadcrumb">
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</Breadcrumbs>
						
						<Typography variant="h3" gutterBottom>
							Smart shopping list
						</Typography>
					</header> 
				
				</Container> */}

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
			</Container>
		</>
	);
}

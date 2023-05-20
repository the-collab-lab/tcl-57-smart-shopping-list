import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

// import './Layout.css';
//Note: color is used for visualization purpose only. Will change colors of app features later in development of app styling.

export function Layout() {
	return (
		<>
			{/*Possibly replace this with AppBar component*/}
			<Container maxWidth="false" sx={{ bgcolor: '#739C83' }}>
				<Container
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
					</header>
				</Container>
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

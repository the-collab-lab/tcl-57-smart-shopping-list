import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

// import './Layout.css';

export function Layout() {
	return (
		<>
			{/*Possibly replace this with AppBar component*/}
			<Container maxWidth="false" sx={{ bgcolor: 'silver' }}>
				<Container
					maxWidth="false"
					sx={{ bgcolor: '#cfe8fc', display: 'flex', justifyContent: 'center' }}
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
					maxWidth="false"
					sx={{
						bgcolor: 'lightpink',
						display: 'flex',
						justifyContent: 'center',
						height: '100vh',
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

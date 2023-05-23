import './ListItem.css';

import {
	ListItem,
	ListItemText,
	Checkbox,
	Chip,
	IconButton,
	Container,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export function ListItemComponent({
	name,
	itemId,
	urgency,
	isDefaultChecked,
	setIsChecked,
	setCheckedItemId,
	onDeleteClick,
	item,
}) {
	const colorByUrgency = {
		soon: 'orange',
		'kind of soon': 'gold',
		'not soon': 'green',
		inactive: 'black',
		overdue: 'red',
	};

	const urgencyColor = colorByUrgency[urgency];
	const dateLastPurchasedFormatted = item.dateLastPurchased
		? `${item.dateLastPurchased
				.toDate()
				.getMonth()
				.toString()
				.padStart(2, '0')}/${item.dateLastPurchased
				.toDate()
				.getDate()
				.toString()
				.padStart(2, '0')}/${item.dateLastPurchased
				.toDate()
				.getFullYear()
				.toString()
				.substring(2)}`
		: 'N/A';
	const additionalItemInfo = `Last Purchased: ${dateLastPurchasedFormatted} • Total Purchases: ${item.totalPurchases}`;

	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	return (
		<ListItem
			disablePadding
			sx={{
				'&': {
					display: 'flex',
					justifyContent: 'space-between',
				},
			}}
		>
			<Container
				sx={{
					'&': {
						display: 'flex',
						alignItems: 'center',
						padding: '0',
						margin: '0',
						maxWidth: '50%',
					},
				}}
			>
				<Checkbox
					id={itemId}
					edge="start"
					defaultChecked={isDefaultChecked}
					tabIndex={-1}
					disableRipple
					inputProps={{ 'aria-labelledby': `checkbox-liist-label=${name}` }}
					onClick={(event) => {
						clickHandler(event, itemId);
					}}
				/>
				<ListItemText
					id={itemId}
					primary={name}
					secondary={additionalItemInfo}
					secondaryTypographyProps={{
						color: '#9c9c9c',
						fontSize: 'small',
					}}
					sx={{
						'&': {
							marginLeft: '10px',
						},
					}}
				/>
			</Container>
			<Chip
				size="small"
				label={urgency}
				sx={{
					'&': {
						backgroundColor: `${urgencyColor}`,
						color: 'white',
						width: '90px',
					},
				}}
			/>
			<IconButton
				edge="end"
				aria-label="delete"
				onClick={() => {
					onDeleteClick(itemId);
				}}
			>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}

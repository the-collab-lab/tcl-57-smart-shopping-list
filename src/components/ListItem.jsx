import './ListItem.css';

import {
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Chip,
	IconButton,
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
}) {
	const colorByUrgency = {
		soon: 'orange',
		'kind of soon': 'gold',
		'not soon': 'green',
		inactive: 'black',
		overdue: 'red',
	};

	const urgencyColor = colorByUrgency[urgency];

	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={() => {
						onDeleteClick(itemId);
					}}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemButton
				role={undefined}
				onClick={(event) => clickHandler(event, itemId)}
				dense
			>
				<ListItemIcon>
					<Checkbox
						id={itemId}
						edge="start"
						defaultChecked={isDefaultChecked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-liist-label=${name}` }}
					/>
				</ListItemIcon>
				<ListItemText id={itemId} primary={name} />
				<Chip
					size="small"
					label={urgency}
					sx={{
						'&': {
							backgroundColor: `${urgencyColor}`,
							color: 'white',
						},
					}}
				/>
			</ListItemButton>
		</ListItem>
	);
}

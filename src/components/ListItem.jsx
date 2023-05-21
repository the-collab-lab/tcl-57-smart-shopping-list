import './ListItem.css';

import {
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Chip,
} from '@mui/material';

export function ListItemComponent({
	name,
	itemId,
	urgency,
	isDefaultChecked,
	setIsChecked,
	setCheckedItemId,
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
		<ListItem disablePadding>
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

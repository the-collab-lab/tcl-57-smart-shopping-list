import './ListItem.css';

import {
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Checkbox,
} from '@mui/material';

export function ListItemComponent({
	name,
	itemId,
	urgency,
	isDefaultChecked,
	setIsChecked,
	setCheckedItemId,
}) {
	const iconsByUrgency = {
		soon: '🟠',
		'kind of soon': '🟡',
		'not soon': '🟢',
		inactive: '⚫️',
		overdue: '🔴',
	};

	const urgencyIcon = iconsByUrgency[urgency];

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
				<ListItemText
					id={itemId}
					primary={`${name} (${urgencyIcon} ${urgency})`}
				/>
			</ListItemButton>
		</ListItem>
	);
}

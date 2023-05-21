import './ListItem.css';

import { ListItem } from '@mui/material';

export function ListItemComponent({ name, urgency }) {
	const iconsByUrgency = {
		soon: '🟠',
		'kind of soon': '🟡',
		'not soon': '🟢',
		inactive: '⚫️',
		overdue: '🔴',
	};

	const urgencyIcon = iconsByUrgency[urgency];

	return (
		<ListItem disablePadding>{`${name} (${urgencyIcon} ${urgency})`}</ListItem>
	);
}

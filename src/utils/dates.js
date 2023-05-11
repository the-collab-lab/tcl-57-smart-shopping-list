export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const CURRENT_DATE = new Date();

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Compute days between two JavaScript Date objects.
 * @param {Date} starting date of interval
 * @param {Date} ending date of interval
 */
export function getDaysBetweenDates(startingDate, endingDate) {
	// normalize date by converting to time
	const startingDateInMilliseconds = startingDate.getTime();
	const endingDateInMilliseconds = endingDate.getTime();

	// calculate the number of days that elapsed between both times
	const daysElapsed = Math.floor(
		(endingDateInMilliseconds - startingDateInMilliseconds) /
			ONE_DAY_IN_MILLISECONDS,
	);

	return daysElapsed;
}

/**
 * Sorting compare callback function. Defines sorting order based on purchasing urgency.'
 * @param {Date} first element up for comparison.
 * @param {Date} second element up for comparison.
 */
function compareItemUrgencyCallback(itemA, itemB) {
	const today = new Date();
	const nameOfItemA = itemA.name;
	const nameOfItemB = itemB.name;
	const dateNextPurchasedItemA = itemA.dateNextPurchased.toDate();
	const dateNextPurchasedItemB = itemB.dateNextPurchased.toDate();
	const daysUntilNextPurchaseItemA = getDaysBetweenDates(
		today,
		dateNextPurchasedItemA,
	);
	const daysUntilNextPurchaseItemB = getDaysBetweenDates(
		today,
		dateNextPurchasedItemB,
	);

	// sort items by purchasing urgency if urgencies are different
	if (daysUntilNextPurchaseItemA !== daysUntilNextPurchaseItemB) {
		return daysUntilNextPurchaseItemA - daysUntilNextPurchaseItemB;
	}
	// sort items alphabetically by name if urgencies are the same
	else {
		return nameOfItemA.localeCompare(nameOfItemB);
	}
}

/**
 * Filter items into active and inactive categories and sort each category based on purchasing urgency.
 * @param {Object[]} An array of objects representing the user's unsorted list
 * @returns {Object[]} An array of objects representing the user's sorted list.
 */
export function comparePurchaseUrgency(unsortedList) {
	const activeItems = [];
	const inactiveItems = [];
	const today = new Date();
	const todayInMilliseconds = today.getTime();

	// filter items as inactive/active and append an urgency property to each object
	for (let i = 0; i < unsortedList.length; i++) {
		const item = unsortedList[i];
		const dateLastPurchased = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: today;
		const daysSinceLastPurchased = getDaysBetweenDates(
			dateLastPurchased,
			today,
		);
		const dateNextPurchased = item.dateNextPurchased.toDate();
		const dateNextPurchasedInMilliseconds = dateNextPurchased.getTime();
		const daysUntilNextPurchase = getDaysBetweenDates(today, dateNextPurchased);

		// inactive items
		if (
			daysSinceLastPurchased >= 60 &&
			todayInMilliseconds > dateNextPurchasedInMilliseconds
		) {
			item.urgency = 'inactive';
			inactiveItems.push(item);
		}

		// active items
		else {
			if (
				daysSinceLastPurchased < 60 &&
				todayInMilliseconds >= dateNextPurchasedInMilliseconds
			) {
				item.urgency = 'overdue';
			}
			if (daysUntilNextPurchase <= 7) {
				item.urgency = 'soon';
			}
			if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
				item.urgency = 'kind of soon';
			}
			if (daysUntilNextPurchase >= 30) {
				item.urgency = 'not soon';
			}
			activeItems.push(item);
		}
	}

	// sort active and inactive items
	activeItems.sort(compareItemUrgencyCallback);
	inactiveItems.sort(compareItemUrgencyCallback);

	const sortedList = [...activeItems, ...inactiveItems];

	return sortedList;
}

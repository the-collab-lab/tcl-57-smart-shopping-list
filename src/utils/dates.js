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
	const dateNextPurchasedItemA = itemA.dateNextPurchased.toDate();
	const dateNextPurchasedItemB = itemB.dateNextPurchased.toDate();

	const daysUntilNextPurchaseItemA = getDaysBetweenDates(
		CURRENT_DATE,
		dateNextPurchasedItemA,
	);
	const daysUntilNextPurchaseItemB = getDaysBetweenDates(
		CURRENT_DATE,
		dateNextPurchasedItemB,
	);
	// sort inactive items last
	if (itemA.urgency === 'inactive' && itemB.urgency !== 'inactive') {
		return 1;
	} else if (itemA.urgency !== 'inactive' && itemB.urgency === 'inactive') {
		return -1;
	}
	// sort items in ascending order of days until purchase
	else if (daysUntilNextPurchaseItemA > daysUntilNextPurchaseItemB) {
		return 1;
	} else if (daysUntilNextPurchaseItemA < daysUntilNextPurchaseItemB) {
		return -1;
	}
	// sort items alphabetically by name if days until purchase are the same
	else {
		return itemA.name.localeCompare(itemB.name);
	}
}

/**
 * Assign a purchase urgency property to each item in an unsorted array and
 * return the array sorted in order of purchase urgency.
 * @param {Object[]} An array of objects representing the user's unsorted list
 * @returns {Object[]} An array of objects representing the user's sorted list.
 */
export function comparePurchaseUrgency(unsortedList) {
	// append an urgency property to each item object
	for (let item of unsortedList) {
		const dateLastPurchased = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: CURRENT_DATE;
		const daysSinceLastPurchased = getDaysBetweenDates(
			dateLastPurchased,
			CURRENT_DATE,
		);
		const daysUntilNextPurchase = getDaysBetweenDates(
			CURRENT_DATE,
			item.dateNextPurchased.toDate(),
		);
		/* TODO: decide the appropriate time frame for each urgency category
		defaulting to AC guidelines results in items added as not-soon
		getting immediately labeled as kind-of-soon */
		item.urgency =
			daysUntilNextPurchase >= 0 && daysUntilNextPurchase <= 7
				? 'soon'
				: daysUntilNextPurchase > 7 && daysUntilNextPurchase < 21
				? 'kind of soon'
				: daysUntilNextPurchase >= 21
				? 'not soon'
				: daysUntilNextPurchase < 0 && daysSinceLastPurchased < 60
				? 'overdue'
				: 'inactive';
	}
	// return sorted list;
	return unsortedList.sort(compareItemUrgencyCallback);
}

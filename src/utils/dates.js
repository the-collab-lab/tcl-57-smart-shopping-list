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

//create a function called getDaysBetweenDates that takes two javascript dates
export function getDaysBetweenDates(firstDate, secondDate) {
	//convert passed in arguments into milliseconds
	const firstDateInMilliseconds = firstDate.getTime();
	const secondDateInMilliseconds = secondDate.getTime();
	//compute the difference between the two times
	//compute the whole number of days of the difference
	const timeDifference = Math.floor(
		(secondDateInMilliseconds - firstDateInMilliseconds) /
			ONE_DAY_IN_MILLISECONDS,
	);
	//return the whole number of days
	return timeDifference;
}

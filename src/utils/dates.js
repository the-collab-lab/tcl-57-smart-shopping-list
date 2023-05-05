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
export function getDaysBetweenDates(startingDate, endingDate) {
	//convert passed in arguments into milliseconds
	const startingDateInMilliseconds = startingDate.getTime();
	const endingDateInMilliseconds = endingDate.getTime();
	//compute the difference between the two times
	//compute the whole number of days of the difference
	const dayInterval = Math.floor(
		(endingDateInMilliseconds - startingDateInMilliseconds) /
			ONE_DAY_IN_MILLISECONDS,
	);
	//return the whole number of days
	return dayInterval;
}

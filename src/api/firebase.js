import {
	addDoc,
	deleteDoc,
	collection,
	onSnapshot,
	getDocs,
	updateDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from './config';
import {
	getFutureDate,
	ONE_DAY_IN_MILLISECONDS,
	CURRENT_DATE,
	getDaysBetweenDates,
} from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Check existence of list in Firestore associated with user token input.
 * @param {string} userTokenInput The user's token input requesting to be validated
 */
export async function validateToken(userTokenInput) {
	const listCollectionRef = collection(db, userTokenInput);
	const listSnapshot = await getDocs(listCollectionRef);
	return !listSnapshot.empty;
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	return snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		/**
		 * Add a new property to each item object in the data array called 'isDefaultChecked' whose value is set to true
		 * if the item was checked less than 24 hours ago, and to false if 24 hours or more have elapsed. This property
		 * will be used in the ListItem Component to control default status of the item's checkmark.
		 */
		let isDefaultChecked;

		if (!data.dateLastPurchased) {
			isDefaultChecked = false;
		} else {
			const date = data.dateLastPurchased.toDate();
			const timeElapsed = CURRENT_DATE - date;
			isDefaultChecked = timeElapsed < ONE_DAY_IN_MILLISECONDS;
		}

		data.isDefaultChecked = isDefaultChecked;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		dateLastPurchased: null, // note: null until the item is purchased, at which point this field is updated by updateItem
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

/**
 * Update the dateLastPurchased and the totalPurchases fields in Firestore for a specified item on user's list.
 * @param {string} listId The id of the user's list
 * @param {string} listItemId The id of the indiividual item
 */

export async function updateItem(listId, listItemId) {
	const listItemRef = doc(db, listId, listItemId);
	const now = new Date();

	const itemSnap = await (await getDoc(listItemRef)).data();

	// conditional assignment to handle user's first purchase of an item
	const dateLastPurchased =
		itemSnap.dateLastPurchased === null
			? now
			: itemSnap.dateLastPurchased.toDate();

	// normalize firestore's timestamp date object to a JS date object
	const dateNextPurchased = itemSnap.dateNextPurchased.toDate();

	const totalPurchases = itemSnap.totalPurchases;
	const newTotalPurchases = totalPurchases + 1;

	// calculate the last estimate of the number of days until the user was likely to purchase this item again
	const previousEstimateOfDays = getDaysBetweenDates(
		dateLastPurchased,
		dateNextPurchased,
	);

	// calculate the actual number of days it took the user to buy the item again
	const actualNumberOfDays = getDaysBetweenDates(dateLastPurchased, now);

	// calculate the new estimate of the number of days until the user is likely to purchase this item again based on purchasing behavior
	const newEstimateOfDays = calculateEstimate(
		previousEstimateOfDays,
		actualNumberOfDays,
		newTotalPurchases,
	);

	// calculate the next date the user is predicted to purchase this item again
	const newDateNextPurchased = getFutureDate(newEstimateOfDays);

	// update entry for purchased item
	await updateDoc(listItemRef, {
		dateLastPurchased: now,
		dateNextPurchased: newDateNextPurchased,
		totalPurchases: newTotalPurchases,
	});
}

/**
 * Deletes an individual item from the user's shopping list.
 * @param {string} listId The id of the list we're deleting from.
 * @param {string} listItemId The id of the indiividual item
 */

export function deleteItem(listId, listItemId) {
	return deleteDoc(doc(db, listId, listItemId));
}

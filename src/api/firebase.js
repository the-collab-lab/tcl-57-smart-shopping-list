import {
	addDoc,
	collection,
	onSnapshot,
	getDocs,
	updateDoc,
	doc,
	increment,
} from 'firebase/firestore';
import { db } from './config';
import {
	getFutureDate,
	ONE_DAY_IN_MILLISECONDS,
	CURRENT_DATE,
	getDaysBetweenDates,
} from '../utils';

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
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
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

	await updateDoc(listItemRef, {
		dateLastPurchased: new Date(),
		totalPurchases: increment(1),
	});

	//import calculateEstimate from @the-collab-lab/shopping-list-util into firebase.js
	//import getDaysBetweenDates utility function
	//take a snapshot of the item in question
	//access dateLastPurchased from firestore and convert to javascript date object
	//access dateNextPurchased from firestore and convert to javascript date object
	//access totalPurchases
	//compute previousEstimate as days between dateNextPurchased and dateLastPurchased calling getDaysBetweenDates utility function
	//compute daysSinceLastPurchase as days between today's date and dateLastPurchased calling getDaysBetweenDates utility function
	//call calculateEstimate with previousEstimate, daysSinceLastPurchase, and totalPurchases
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

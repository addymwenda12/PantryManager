import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const PANTRY_COLLECTION = "pantryItems";


/* ADD PANTRY ITEM */
export async function addPantryItem(item) {
  try {
    const docRef = await addDoc(collection(firestore, PANTRY_COLLECTION), item);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

/* GET PANTRY ITEMS */
export async function getPantryItems() {
	try {
  const querySnapshot = await getDocs(collection(firestore, PANTRY_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	} catch (e) {
		console.error("Error getting documents: ", e);
		throw e;
	}
}

/* UPDATE PANTRY ITEM */
export async function updatePantryItem(item, newData) {
	try {
		const itemRef = doc(firestore, PANTRY_COLLECTION, item.id);
		await updateDoc(itemRef, newData);
	} catch (e) {
		console.error("Error updating document: ", e);
		throw e;
	}
}

/* DELETE PANTRY ITEM */
export async function deletePantryItem(itemId) {
	try {
		await deleteDoc(doc(firestore, PANTRY_COLLECTION, itemId));
	} catch (e) {
		console.error("Error deleting document: ", e);
		throw e;
	}
}
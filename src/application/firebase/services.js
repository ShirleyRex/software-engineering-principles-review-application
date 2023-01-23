import {
	doc,
	collection,
	getDoc,
	getDocs,
	query,
	where,
	addDoc,
	updateDoc,
	deleteDoc,
	arrayUnion,
	Timestamp
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebaseConfig';

export async function register(username, email, password) {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);

		const user = res?.user;

		await addDoc(collection(db, 'users'), { uid: user.uid, username, email, authProvider: 'local' });

		if (!user) {
			throw new Error('Unable to register you at the moment, please try again.');
		}

		return { success: true, message: 'Registered successfully' };
	} catch (err) {
		console.error(err.message);
		return { success: false, message: err.message };
	}
}

export async function login(email, password) {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		const user = res.user;
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const doc = await getDocs(q);
		const data = doc?.docs[0]?.data();

		if (!data) {
			throw new Error('Unable to retrieved your info due to some error. Try again later');
		}

		return { success: true, message: 'Successful login', data };
	} catch (err) {
		console.error(err.message);
		return { data: null, success: false, message: err.message };
	}
}

export async function authenticateAndFetch(user) {
	try {
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const doc = await getDocs(q);
		const data = doc?.docs[0]?.data();

		if (!data) {
			throw new Error('Unable to retrieved your info due to some error. Try again later');
		}

		return { success: true, message: 'Successful login', data };
	} catch (err) {
		console.error(err);
		return { data: null, error: err.message };
	}
}

export async function logout() {
	signOut(auth);
}

export async function getCollection(collectionName) {
	try {
		let collectionArr = [];

		const querySnapShot = await getDocs(collection(db, collectionName));

		querySnapShot.forEach((doc) => {
			let resultItem = { id: doc.id, ...doc.data() };
			if (collectionName === 'reviews') {
				resultItem = Object.assign(resultItem, { timestamp: String(doc.data().timestamp.toDate()) });
			}
			collectionArr.push(resultItem);
		});

		if (!collectionArr || !collectionArr.length) {
			throw new Error('Unable to fetch data');
		}
		return collectionArr;
	} catch (err) {
		console.error(err);
		return [];
	}
}

export async function getSinglePost(params = {}) {
	const queryParams = Object.entries(params)[0];
	try {
		const reviewsArr = [];
		const docRef = doc(db, 'locations', queryParams[1]);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists) {
			throw new Error('This document does not exist');
		}

		const q = query(collection(db, 'reviews'), where(`location.${queryParams[0]}`, '==', queryParams[1]));

		const querySnapShot = await getDocs(q);

		querySnapShot.forEach((doc) => {
			const subRevArr = [];

			reviewsArr.push({ id: doc.id, ...doc.data(), reply_thread: subRevArr });
		});

		return { post: { id: docSnap.id, ...docSnap.data() }, reviews: reviewsArr };
	} catch (err) {
		console.error(err.message);
		return {};
	}
}

export const addNewReview = async (payload) => {
	try {
		const docRef = await addDoc(collection(db, payload.collection), payload.data);
		if (!docRef.id) {
			throw new Error('Unable to add new data due to some error');
		}

		await updateDoc(doc(db, 'locations', payload.data.location.id), {
			reviews: arrayUnion(JSON.stringify({ id: docRef.id, rating: payload.data.rating }))
		});

		return { id: docRef.id, ...payload.data, timestamp: String(payload.data.timestamp) };
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const addReplyToThread = async (data) => {
	console.log(data);
	try {
		const docRef = await addDoc(collection(db, 'sub_reviews'), { ...data, timestamp: Timestamp.fromDate(new Date()) });

		if (!docRef.id) {
			throw new Error('Unable to add new reply to thread');
		}

		return { success: true };
	} catch (err) {
		console.error(err.message);

		return { success: false };
	}
};

export const updateDocInfo = async (coltName, payload) => {
	const id = payload.id;
	delete payload.id;

	try {
		await updateDoc(doc(db, coltName, id), payload);

		return { id, ...payload };
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const updateDocArr = async (payload) => {
	try {
		await updateDoc(doc(db, payload.collection, payload.docId), {
			reviews_thread: arrayUnion({ timestamp: Timestamp.fromDate(new Date()), ...payload.data })
		});

		return { success: true };
	} catch (err) {
		console.error(err);
		return { success: false };
	}
};

export const deleteReview = async (collectionName, id) => {
	try {
		await deleteDoc(doc(db, collectionName, id));

		return { id: id };
	} catch (err) {
		console.error(err);
		return null;
	}
};

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDT6Jje-nxMYP81rXd2i8z3zFrTxpN4Ujk',
	authDomain: 'sep-project-32f29.firebaseapp.com',
	projectId: 'sep-project-32f29',
	storageBucket: 'sep-project-32f29.appspot.com',
	messagingSenderId: '477225620331',
	appId: '1:477225620331:web:714d8084d922e50393322e',
	measurementId: 'G-R00G9KHQ7E'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

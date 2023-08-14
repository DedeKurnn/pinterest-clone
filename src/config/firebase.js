// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDIV5IZ6Nkjc0C48oKGgaWWeD_uuzdNgMI",
	authDomain: "pinterest-clone-25c40.firebaseapp.com",
	projectId: "pinterest-clone-25c40",
	storageBucket: "pinterest-clone-25c40.appspot.com",
	messagingSenderId: "811968947805",
	appId: "1:811968947805:web:e4a653e0363aeef3984fb4",
	measurementId: "G-3JNM325Q5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return { isLoggedIn, currentUser };
};

export default useAuth;

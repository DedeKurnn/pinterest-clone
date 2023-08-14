import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const debounce = (func, delay) => {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

const useSearch = (field = "title", queryValue) => {
	const [queryResult, setQueryResult] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const pinRef = collection(db, "pins");
				const q = query(pinRef, where(field, "==", queryValue));

				const querySnapshot = await getDocs(q);
				const result = [];
				querySnapshot.forEach((doc) => {
					result.push(doc.data());
				});

				setQueryResult(result);
			} catch (err) {
				console.log(err.message);
			}
		};

		const debounceFetchData = debounce(fetchData, 300);
		debounceFetchData();
	}, [queryValue, field]);

	return queryResult;
};

export default useSearch;

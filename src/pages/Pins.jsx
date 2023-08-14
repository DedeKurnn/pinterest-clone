/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import PropTypes from "prop-types";
import { SearchContext } from "../context/searchContext";
import useSearch from "../hooks/useSearch";
import PinList from "../components/PinList";

const Pins = () => {
	const { query } = useContext(SearchContext);
	const queryResult = useSearch("title", query);
	const [pinList, setPinList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const querySnapshot = await getDocs(collection(db, "pins"));
			const documents = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return { id: doc.id, ...data };
			});
			setPinList(documents);
		};

		fetchData();

		const unsubscribe = onSnapshot(collection(db, "pins"), (snapshot) => {
			const documents = snapshot.docs.map((doc) => {
				const data = doc.data();
				return { id: doc.id, ...data };
			});
			setPinList(documents);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<main className="container mx-auto pr-2">
			{queryResult && query !== "" && (
				<div className="mt-4 text-center mb-8 opacity-60">
					<p>
						DISCLAIMER: Please ensure that you enter the exact and
						complete title of the image you wish to search for (case
						sensitive).
						<br />
						Kindly note that the search capability may have
						limitations and may not yield accurate results.
					</p>
				</div>
			)}
			<PinList
				queryResult={queryResult}
				query={query}
				pinList={pinList}
			/>
		</main>
	);
};

Pins.propTypes = {
	query: PropTypes.string,
};

export default Pins;

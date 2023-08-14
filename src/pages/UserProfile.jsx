import PinList from "../components/PinList";
import Button from "../components/UI/Button";
import useAuth from "../hooks/useAuth";
import { Suspense, useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Loading from "../components/UI/Loading";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
	const { currentUser } = useAuth();
	const [toggleTab, setToggleTab] = useState(null);
	const [savedPinArray, setSavedPinArray] = useState([]);
	const [savedPins, setSavedPins] = useState(null);
	const queryResult = useSearch("userID", currentUser?.uid);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDataRef = doc(db, "user_data", currentUser?.uid);
				const dataSnapshot = await getDoc(userDataRef);
				const userData = dataSnapshot.data();

				if (
					userData &&
					userData.savedPins.length > 0 &&
					!savedPinArray.length
				) {
					setSavedPinArray(userData.savedPins);
				}

				if (savedPinArray.length > 0) {
					const pinRef = savedPinArray.map((pin) =>
						doc(db, "pins", pin)
					);
					const pinSnapshot = await Promise.all(
						pinRef.map((pinRef) => getDoc(pinRef))
					);
					const pinData = pinSnapshot.map((pinSnapshot) =>
						pinSnapshot.data()
					);
					setSavedPins(pinData.filter((pin) => pin));
				}
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, [currentUser?.uid, savedPinArray]);

	return (
		<Suspense fallback={<Loading />}>
			<main>
				<div className="flex flex-col items-center mx-auto mt-8">
					<div className="w-48 rounded-full overflow-hidden">
						<img
							src={currentUser?.photoURL}
							alt={currentUser?.displayName}
							draggable="false"
						/>
					</div>
					<h1 className="mt-4 text-3xl font-semibold">
						{currentUser?.displayName}
					</h1>
					<p className="mt-2">
						{currentUser?.bio ? currentUser?.bio : "No bio yet"}
					</p>
					<Button
						className="mt-8"
						onClick={() =>
							navigate(`/${currentUser?.displayName}/edit`)
						}
					>
						Edit profile
					</Button>
				</div>
				<div className="flex gap-4 my-8 justify-center">
					<Button
						onClick={() => setToggleTab(true)}
						className={toggleTab && "!bg-primaryBlack text-white"}
					>
						Your pin
					</Button>
					<Button
						onClick={() => setToggleTab(false)}
						className={!toggleTab && "!bg-primaryBlack text-white"}
					>
						Saved pins
					</Button>
				</div>
				{toggleTab ? (
					<PinList queryResult={queryResult} />
				) : (
					<PinList queryResult={savedPins} />
				)}
			</main>
		</Suspense>
	);
};

export default UserProfile;

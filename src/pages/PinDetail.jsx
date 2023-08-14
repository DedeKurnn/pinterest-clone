/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import AuthorProfile from "../components/AuthorProfile";
import { useLocation } from "react-router-dom";
import Button from "../components/UI/Button";
import {
	ArrowDownTrayIcon,
	LinkIcon,
	ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Toast from "../components/UI/Toast";
import { createPortal } from "react-dom";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import { Suspense } from "react";
import Loading from "../components/UI/Loading";

const PinDetail = () => {
	const location = useLocation();
	const item = location.state.item;
	const navigate = useNavigate();
	const { currentUser, isLoggedIn } = useAuth();
	const [showClipboardToast, setShowClipboardToast] = useToast();
	const [showSaveToast, setShowSaveToast] = useToast();
	const [showDataExistToast, setShowDataExistToast] = useToast();
	const [mustLoginFirst, setMustLoginFirst] = useToast();

	const downloadImageHandler = () => {
		const imageUrl = item.image;
		const link = document.createElement("a");
		link.href = imageUrl;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const copyLinkHandler = () => {
		setShowClipboardToast(true);
	};

	const savePinHandler = async () => {
		try {
			if (!isLoggedIn) {
				setMustLoginFirst(true);
				return;
			}
			const userDataCollectionRef = doc(db, "user_data", currentUser.uid);
			const userDataSnapshot = await getDoc(userDataCollectionRef);
			const userData = userDataSnapshot.data();
			if (userData && userData.savedPins.includes(item.id)) {
				setShowDataExistToast(true);
				console.log(showDataExistToast);
				return;
			}

			await updateDoc(userDataCollectionRef, {
				savedPins: arrayUnion(item.id),
			});
			setShowSaveToast(true);
			console.log("Successful!");
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Suspense fallback={<Loading />}>
			{showClipboardToast ||
			showSaveToast ||
			showDataExistToast ||
			mustLoginFirst
				? createPortal(
						<Toast>
							{showClipboardToast
								? "Link copied to clipboard"
								: showSaveToast
								? "Saved to your collection"
								: showDataExistToast
								? "You already saved this pin"
								: mustLoginFirst && "You need to log in first"}
						</Toast>,
						document.body
				  )
				: null}
			<ArrowLeftIcon
				className="hidden sm:block fixed top-24 z-10 left-12 w-12 h-12 text-black p-2 rounded-full shadow-lg hover:cursor-pointer hover:bg-primaryBlack hover:text-white transition-all"
				onClick={() => navigate("..")}
			/>
			<main className="w-full sm:w-2/3 sm:mx-auto flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-xl mt-4">
				<div className="w-full sm:w-1/2">
					<img src={item.image} alt={item.title} draggable="false" />
				</div>
				<div className="w-full sm:w-1/2 p-4 sm:p-8">
					<div className="flex gap-4 items-center justify-between mb-8">
						<div className="flex gap-4 items-center">
							<ArrowDownTrayIcon
								className="w-12 h-12 p-2 rounded-full hover:cursor-pointer hover:shadow-lg"
								onClick={downloadImageHandler}
							/>
							<LinkIcon
								className="w-12 h-12 p-2 rounded-full hover:cursor-pointer hover:shadow-lg"
								onClick={copyLinkHandler}
							/>
						</div>
						<Button color="primary" onClick={savePinHandler}>
							Save
						</Button>
					</div>
					<AuthorProfile />
					<div>
						<h1 className="text-3xl font-semibold">{item.title}</h1>
						<p className="text-normal mt-2">{item?.description}</p>
					</div>
				</div>
			</main>
		</Suspense>
	);
};

PinDetail.propTypes = {
	item: PropTypes.object,
};

export default PinDetail;

import { Form, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Suspense, useState } from "react";
import { db, storage } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";
import Button from "../components/UI/Button";
import Loading from "../components/UI/Loading";
import useAuth from "../hooks/useAuth";

const NewPin = () => {
	const [image, setImage] = useState(null);
	const [imagePath, setImagePath] = useState(null);
	const [pinTitle, setPinTitle] = useState(null);
	const [pinDescription, setPinDescription] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const { currentUser } = useAuth();
	const pinCollectionRef = collection(db, "pins");
	const navigate = useNavigate();

	const uploadImageHandler = (event) => {
		setImage(event.target.files[0]);
		setImagePath(URL.createObjectURL(event.target.files[0]));
	};

	const onSubmitPin = () => {
		try {
			setIsUploading(true);
			const imageRef = ref(storage, `pin_images/${image.name + uuid()}`);
			uploadBytes(imageRef, image)
				.then(() => {
					return getDownloadURL(imageRef);
				})
				.then((url) => {
					return addDoc(pinCollectionRef, {
						title: pinTitle,
						description: pinDescription,
						image: url,
						userID: currentUser.uid,
					});
				})
				.then(() => {
					console.log("Pin data added to Firestore");
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setIsUploading(false);
					navigate("/home");
				});
		} catch (err) {
			console.error(err);
			setIsUploading(false);
		}
	};

	return (
		<Suspense fallback={<Loading></Loading>}>
			<main className="w-1/2 mx-auto mt-8 p-8 bg-white h-[70vh] object-contain border-2 rounded-2xl">
				{isUploading &&
					createPortal(
						<Loading>Uploading...</Loading>,
						document.body
					)}
				<Form className="flex gap-8" onSubmit={onSubmitPin}>
					<div
						className="border-2 border-secondaryGrey border-dashed rounded-lg w-1/3 h-[60vh] flex justify-center items-center hover:cursor-pointer overflow-hidden"
						onClick={() =>
							document.querySelector("#pin-image").click()
						}
					>
						<input
							type="file"
							accept="image/*"
							id="pin-image"
							hidden
							onChange={uploadImageHandler}
						/>
						{image ? (
							<img
								src={imagePath}
								className="w-full h-full object-contain"
								alt={image.name}
							/>
						) : (
							<div className="flex flex-col items-center gap-2 opacity-50">
								<PlusIcon className="w-8 text-secondaryGrey" />
								<span>Add image</span>
							</div>
						)}
					</div>
					<div className="w-2/3 flex flex-col items-end">
						<input
							type="text"
							placeholder="Add title"
							className="w-full h-16 font-lg border-b-2 border-secondaryGrey font-semibold focus:outline-none"
							onChange={(e) => setPinTitle(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Tell everyone about your pin"
							className="w-full font-base border-b-2 border-secondaryGrey font-semibold my-8 h-8 focus:outline-none"
							onChange={(e) => setPinDescription(e.target.value)}
						/>
						<Button color="primary" type="submit">
							Save
						</Button>
					</div>
				</Form>
			</main>
		</Suspense>
	);
};

export default NewPin;

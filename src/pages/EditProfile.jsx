import { Input } from "@material-tailwind/react";
import Button from "../components/UI/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditProfile = () => {
	const { currentUser } = useAuth();
	const [username, setUsername] = useState(currentUser?.displayName);
	const [email, setEmail] = useState(currentUser?.email);
	const [bio, setBio] = useState("");

	const navigate = useNavigate();

	return (
		<main className="w-full md:w-2/5 mx-auto my-8">
			<h1 className="mb-4 text-2xl text-center font-semibold">
				Edit public profile
			</h1>
			<div className="flex flex-col justify-center items-center gap-4 mb-4">
				<img
					className="w-1/2"
					src={currentUser?.photoURL}
					alt={currentUser?.displayName}
					draggable="false"
				/>
				<Button>Change photo</Button>
			</div>
			<div className="flex flex-col gap-4 mb-4 items-center px-4">
				<Input
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					label="Bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>
				<div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4 w-full">
					<Button color="primary" className="!w-fit">
						Save
					</Button>
					<Button onClick={() => navigate("..")} className="!w-fit">
						Cancel
					</Button>
					<Button className="!text-primaryRed border-2 !w-fit border-primaryRed">
						Delete account
					</Button>
				</div>
			</div>
		</main>
	);
};

export default EditProfile;

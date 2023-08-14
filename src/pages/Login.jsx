import { Suspense, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import logo from "../assets/pinterest-logo-notext.png";
import { auth, db } from "../config/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { Input } from "@material-tailwind/react";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { AvatarGenerator } from "random-avatar-generator";
import { setDoc, doc } from "firebase/firestore";

const Login = ({ isLogin }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [userName, setUserName] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState(true);
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const generator = new AvatarGenerator();

	const navigate = useNavigate();

	const usernameChangeHandler = (e) => {
		setUserName(e.target.value);
	};

	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
		if (!email.includes("@")) {
			setEmailIsValid(true);
		} else {
			setEmailIsValid(undefined);
		}
	};

	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
		if (password.trim().length < 7) {
			setPasswordIsValid(true);
		} else {
			setPasswordIsValid(undefined);
		}
	};

	const signUpHandler = async () => {
		try {
			const avatar = generator.generateRandomAvatar();
			setIsLoading(true);
			const credential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(credential.user, {
				displayName: userName,
				photoURL: avatar,
			});

			await setDoc(doc(db, "user_data", credential.user.uid), {
				username: credential.user.displayName,
				avatar: credential.user.photoURL,
			});
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoading(false);
			navigate("/");
		}
	};

	const loginHandler = async () => {
		try {
			setIsLoading(true);
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(userCredential.user);
			navigate("/");
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Suspense fallback={<Loading></Loading>}>
			{isLoading &&
				createPortal(
					<Loading>Authenticating...</Loading>,
					document.body
				)}
			<main className="w-1/3 p-8 mx-auto mt-8 rounded-2xl shadow-xl">
				<div className="flex flex-col gap-2 items-center mb-8">
					<img
						src={logo}
						alt="Pinterest logo"
						className="w-16"
						draggable="false"
					/>
					<h1 className="text-3xl font-semibold">
						{isLogin ? "Log in to see more" : "Sign up to see more"}
					</h1>
				</div>
				<div className="flex flex-col gap-4">
					{!isLogin && (
						<Input
							type="text"
							label="Username"
							size="lg"
							value={userName}
							onChange={usernameChangeHandler}
						/>
					)}
					<Input
						type="email"
						label="Email"
						size="lg"
						value={email}
						onChange={emailChangeHandler}
						error={emailIsValid}
					/>
					<Input
						type="password"
						label="Password"
						size="lg"
						onChange={passwordChangeHandler}
						error={passwordIsValid}
					/>
					{passwordIsValid && (
						<p>Password must atleast 8 characters long</p>
					)}
					{isLogin ? (
						<Button color="primary" onClick={loginHandler}>
							Log in
						</Button>
					) : (
						<Button color="primary" onClick={signUpHandler}>
							Sign up
						</Button>
					)}
				</div>
				<p className="mt-4 text-center">
					{isLogin
						? "Doesn't have an account? "
						: "Already have an account? "}
					{isLogin ? (
						<span
							className="font-bold hover:cursor-pointer"
							onClick={() => navigate("/signup")}
						>
							Sign up
						</span>
					) : (
						<span
							className="font-bold hover:cursor-pointer"
							onClick={() => navigate("/login")}
						>
							Log in
						</span>
					)}
				</p>
			</main>
		</Suspense>
	);
};

Login.propTypes = {
	isLogin: PropTypes.bool,
};

export default Login;

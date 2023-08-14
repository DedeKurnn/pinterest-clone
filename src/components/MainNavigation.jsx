import { Input } from "@material-tailwind/react";
import logo from "../assets/pinterest-logo-notext.png";
import { NavLink } from "react-router-dom";
import Button from "./UI/Button";
import {
	ChatBubbleLeftEllipsisIcon,
	BellIcon,
	MagnifyingGlassIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import UserDropDownMenu from "./UI/UserDropDownMenu";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { SearchContext } from "../context/searchContext";

const MainNavigation = () => {
	const { query, setQuery } = useContext(SearchContext);
	const [showDropDown, setShowDropDown] = useState(false);
	const { isLoggedIn, currentUser } = useAuth();
	const navigate = useNavigate();

	const profileButtonHandler = () => {
		setShowDropDown(!showDropDown);
	};

	return (
		<header className="sticky top-0 px-4 md:px-12 w-full py-4 mx-auto z-99 bg-white">
			<nav className="flex items-center w-full gap-8 justify-between">
				<ul className="flex gap-4 items-center">
					<li className="w-12">
						<img
							src={logo}
							alt="Pinterest Logo"
							className="w-full"
							onClick={() => navigate("/")}
							draggable="false"
						/>
					</li>
					<li className="hidden md:block">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "bg-primaryBlack py-2 px-4 rounded-full text-white"
									: "bg-white py-2 px-4 rounded-full text-black"
							}
							to="/"
							end
						>
							Home
						</NavLink>
					</li>
					{isLoggedIn && (
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive
										? "bg-primaryBlack py-2 px-4 rounded-full text-white"
										: "bg-white py-2 px-4 rounded-full text-black"
								}
								to="new"
							>
								Create
							</NavLink>
						</li>
					)}
				</ul>
				<div className="hidden md:block w-full">
					<Input
						size="lg"
						labelProps={{
							className: "hidden",
						}}
						placeholder="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						icon={<MagnifyingGlassIcon />}
						className=" !text-normal !rounded-full focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 !bg-tertiaryLightGrey placeholder:text-blue-gray-500 text-blue-gray-500"
					/>
				</div>
				<>
					{isLoggedIn ? (
						<ul className="flex gap-4 items-center">
							<li>
								<ChatBubbleLeftEllipsisIcon className="text-secondaryGrey w-12 p-2 rounded-full hover:bg-tertiaryLightGrey hover:cursor-pointer" />
							</li>
							<li>
								<BellIcon className="text-secondaryGrey w-12 p-2 rounded-full hover:bg-tertiaryLightGrey hover:cursor-pointer" />
							</li>
							<li className="relative">
								<div className="flex gap-2">
									<div
										className="w-8 rounded-full overflow-hidden bg-primaryRed aspect-square hover:ring-4 hover:cursor-pointer hover:ring-blue-200 ml-2 flex justify-center items-center"
										onClick={() =>
											navigate(
												`${currentUser.displayName}`
											)
										}
									>
										<img
											src={currentUser.photoURL}
											alt={currentUser.displayName}
										/>
									</div>
									<ChevronDownIcon
										className="w-4 hover:cursor-pointer"
										onClick={profileButtonHandler}
									/>
								</div>
								{showDropDown && <UserDropDownMenu />}
							</li>
						</ul>
					) : (
						<ul className="flex gap-4 items-center">
							<li>
								<Button
									className="!w-28"
									onClick={() => navigate("login")}
								>
									Log in
								</Button>
							</li>
							<li>
								<Button className="!w-32" color="primary">
									Sign up
								</Button>
							</li>
						</ul>
					)}
				</>
			</nav>
		</header>
	);
};

MainNavigation.propTypes = {
	query: PropTypes.string,
	handleQuery: PropTypes.func,
};
export default MainNavigation;

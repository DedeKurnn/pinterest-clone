import {
	ChatBubbleLeftEllipsisIcon,
	BellIcon,
	UserIcon,
	ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

const UserDropDownMenu = () => {
	const isLoggedIn = useAuth();
	const signOutHandler = async () => {
		await signOut(auth);
	};

	return (
		<div className="absolute top-12 right-0">
			<ul className="p-2 bg-gray-100 flex flex-col gap-2 shadow-xl border-2 border-gray-300 z-10 rounded-lg">
				{isLoggedIn && (
					<>
						<li className="flex gap-2 items-center px-4 py-2 hover:bg-gray-300 rounded-md hover:cursor-pointer">
							<UserIcon className="text-secondaryGrey w-6" />
							<span className="whitespace-nowrap">
								Edit Profile
							</span>
						</li>
						<li className="flex md:hidden gap-2 items-center px-4 py-2 hover:bg-gray-300 rounded-md hover:cursor-pointer">
							<BellIcon className="text-secondaryGrey w-6" />
							<span>Notification</span>
						</li>
						<li className="flex md:hidden gap-2 items-center px-4 py-2 hover:bg-gray-300 rounded-md hover:cursor-pointer">
							<ChatBubbleLeftEllipsisIcon className="text-secondaryGrey w-6" />
							<span>Message</span>
						</li>
						<li
							className="flex gap-2 items-center px-4 py-2 hover:bg-gray-300 rounded-md hover:cursor-pointer"
							onClick={signOutHandler}
						>
							<ArrowLeftOnRectangleIcon className="text-secondaryGrey w-6" />
							<span>Logout</span>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

UserDropDownMenu.PropTypes = {
	isShown: PropTypes.bool,
};

export default UserDropDownMenu;

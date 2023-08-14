import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Suspense } from "react";

const Home = () => {
	return (
		<Suspense fallback={<MainNavigation />}>
			<MainNavigation />
			<Outlet />
		</Suspense>
	);
};

export default Home;

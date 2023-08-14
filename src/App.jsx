import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";

const NewPin = lazy(() => import("./pages/NewPin"));
const PinDetail = lazy(() => import("./pages/PinDetail"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Login = lazy(() => import("./pages/Login"));
const Pins = lazy(() => import("./pages/Pins"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				element: <Pins />,
			},
			{
				path: "new",
				element: <NewPin />,
			},
			{
				path: "pin/:id",
				element: <PinDetail />,
			},
			{
				path: "/:id",
				element: <UserProfile />,
			},
			{
				path: "/:id/edit",
				element: <EditProfile />,
			},
			{
				path: "login",
				element: <Login isLogin={true} />,
			},
			{
				path: "signup",
				element: <Login isLogin={false} />,
			},
		],
	},
]);
const App = () => {
	return <RouterProvider router={routes} />;
};

export default App;

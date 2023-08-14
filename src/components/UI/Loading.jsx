import { Spinner } from "@material-tailwind/react";
import PropTypes from "prop-types";

const Loading = ({ children }) => {
	return (
		<div className="fixed flex h-screen w-full tranlate-x-0 -translate-y-1/2 top-1/2 left-0 bg-black bg-opacity-20 items-center justify-center">
			<div className="p-16 bg-white rounded-xl flex flex-col items-center">
				<Spinner className="h-8 w-8" color="red" />
				{children && (
					<p className="mt-4 font-medium opacity-80">{children}</p>
				)}
			</div>
			<div className="absolute top-1/2 translate-x-0 -translate-y-1/2 w-full z-5 h-screen"></div>
		</div>
	);
};

Loading.propTypes = {
	children: PropTypes.node,
};

export default Loading;

/* eslint-disable no-mixed-spaces-and-tabs */
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./UI/Loading";

const PinList = ({ queryResult, pinList, query }) => {
	const breakpoints = {
		default: 5,
		1100: 3,
		700: 2,
	};

	const navigate = useNavigate();

	return (
		<Suspense fallback={<Loading></Loading>}>
			<Masonry
				breakpointCols={breakpoints}
				className="flex -ml-2 w-auto md:mx-4"
				columnClassName="pl-4 bg-clip-padding"
			>
				{queryResult && query !== ""
					? queryResult.map((pin) => (
							<Pin
								key={pin.id}
								pinImage={pin.image}
								pinTitle={pin.title}
								onClick={() =>
									navigate(`/pin/${pin.id}`, {
										state: { item: pin },
									})
								}
							/>
					  ))
					: pinList?.map((pin) => (
							<Pin
								key={pin.id}
								pinImage={pin.image}
								pinTitle={pin.title}
								onClick={() =>
									navigate(`pin/${pin.id}`, {
										state: { item: pin },
									})
								}
							/>
					  ))}
			</Masonry>
		</Suspense>
	);
};

PinList.propTypes = {
	queryResult: PropTypes.array,
	pinList: PropTypes.array,
	query: PropTypes.string,
	isLoading: PropTypes.bool,
};

export default PinList;

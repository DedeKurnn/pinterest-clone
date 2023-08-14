import PropTypes from "prop-types";
import { useState } from "react";

const Pin = ({ pinImage, pinTitle, authorImage, username, onClick }) => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div className="mb-4">
			<div
				className="rounded-lg overflow-hidden bg-cover bg-center"
				style={{ backgroundColor: "#e0e0e0" }}
			>
				<img
					src={pinImage}
					alt={pinTitle}
					className={`${isLoading ? "opacity-0" : "opacity-100"}
							w-full block object-center object-cover transition-all`}
					onClick={onClick}
					loading="lazy"
					onLoad={() => setIsLoading(false)}
					draggable="false"
				/>
			</div>
			{authorImage || username ? (
				<div className="flex gap-2">
					<img src={authorImage} alt={username} />
					<span>{username}</span>
				</div>
			) : undefined}
		</div>
	);
};

Pin.propTypes = {
	pinImage: PropTypes.string,
	authorImage: PropTypes.object,
	username: PropTypes.string,
	pinTitle: PropTypes.string,
	onClick: PropTypes.func,
};

Pin.defaultProps = {
	authorImage: null,
	username: null,
};

export default Pin;

import PropTypes from "prop-types";

const Button = ({ children, onClick, color, className }) => {
	return (
		<button
			onClick={onClick}
			className={`px-8 py-3 rounded-full font-semibold ${className} ${
				color === "primary"
					? "bg-primaryRed text-white"
					: "bg-tertiaryLightGrey text-black"
			}`}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	color: PropTypes.string,
	className: PropTypes.string,
};

export default Button;

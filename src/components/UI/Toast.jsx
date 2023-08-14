import PropTypes from "prop-types";
import classes from "./Toast.module.css";

const Toast = ({ children }) => {
	return <div className={classes.toast}>{children}</div>;
};

Toast.propTypes = {
	children: PropTypes.node,
};

export default Toast;

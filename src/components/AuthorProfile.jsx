import PropTypes from "prop-types";
const AuthorProfile = ({ user }) => {
	return (
		<div>
			<img src={user?.photoURL} alt={user?.displayName} />
			<div>
				<span>{user?.displayName}</span>
				<span>{user?.bio}</span>
			</div>
		</div>
	);
};

AuthorProfile.propTypes = {
	user: PropTypes.object,
};

export default AuthorProfile;

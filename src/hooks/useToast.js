import { useState } from "react";

const useToast = () => {
	const [showToast, setShowToast] = useState(false);

	const showToastHandler = () => {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	return [showToast, showToastHandler];
};

export default useToast;

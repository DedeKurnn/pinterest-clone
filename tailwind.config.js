/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			primaryRed: "#E60023",
			primaryBlack: "#111111",
			secondaryGrey: "#5F5F5F",
			tertiaryLightGrey: "#E9E9E9",
		},
	},
	plugins: [],
});

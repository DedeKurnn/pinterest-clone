import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
	const [query, setQuery] = useState("");

	return (
		<SearchContext.Provider value={{ query, setQuery }}>
			{children}
		</SearchContext.Provider>
	);
};

SearchContextProvider.propTypes = {
	children: PropTypes.node,
};

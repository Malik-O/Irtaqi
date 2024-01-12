import { useCallback } from "react";
// utils
import capitalize from "../utils/capitalize";
// redux
import { useSelector } from "react-redux";

export default function (lang, util) {
	const { messages, locale } = useSelector((state) => state.lang);
	return useCallback((word, cap, allWords = true, props = []) => {
		word = messages?.[lang || locale || "en"]?.[word] || word;
		// apply capitalization
		word = cap ? capitalize(word, allWords) : word;
		// apply util
		if (util && props.length) return util(word, props);
		return word;
	}, []);
}

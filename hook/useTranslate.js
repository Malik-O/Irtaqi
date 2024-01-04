import { useCallback } from "react";
// utils
import capitalize from "../utils/capitalize";
// redux
import { useSelector } from "react-redux";

export default function (lang, util) {
	const { messages, locale } = useSelector((state) => state.lang);
	return useCallback((word, cap, allWords = true, props = []) => {
		word = messages?.[lang || locale || "en"]?.[word] || word;
		word = cap ? capitalize(word, allWords) : word;
		console.log("word:", word, util && util(word, props));
		if (util && props.length) return util(word, props);
		return word;
	}, []);
}

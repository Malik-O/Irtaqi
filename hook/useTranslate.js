import { useCallback } from "react";
// utils
import capitalize from "../utils/capitalize";
// redux
import { useSelector } from "react-redux";

export default function (lang) {
	const { messages, locale } = useSelector((state) => state.lang);
	return useCallback((word, cap, allWords = true) => {
		word = messages?.[lang || locale || "en"]?.[word] || word;
		return cap ? capitalize(word, allWords) : word;
	}, []);
}

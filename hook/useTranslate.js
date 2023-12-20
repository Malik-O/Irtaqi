// utils
import capitalize from "../utils/capitalize";
// redux
import { useSelector } from "react-redux";

export default function () {
	const { messages, locale } = useSelector((state) => state.lang);
	return (word, cap, allWords = true) => {
		word = messages?.[locale || "en"]?.[word] || word;
		return cap ? capitalize(word, allWords) : word;
	};
}

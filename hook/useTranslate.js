// redux
import { useSelector } from "react-redux";

export default function () {
	const { messages, locale } = useSelector((state) => state.lang);
	return (word) => messages?.[locale]?.[word] || word;
}

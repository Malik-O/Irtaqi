// redux
import { useSelector } from "react-redux";
// hook
import useTranslate from "../useTranslate";
// utils
import stringify from "../../utils/stringify";

export default function () {
	// redux
	const { locale: localLang } = useSelector((state) => state.lang);
	// translations hook
	const translate = useTranslate();
	return (plan, details = true) => {
		// transform to string format
		let forToday = plan.day?.reduce((acc, curr) => {
			acc.push(
				stringify({
					courseTitle: "quran",
					details,
					title: plan.title,
					translate,
					localLang,
					day: curr,
				}),
			);
			return acc;
		}, []);
		return forToday?.length ? forToday : translate("nothingTodayMessage");
	};
}

import { useMemo } from "react";
// redux
import { useSelector } from "react-redux";

const dayInMs = 1000 * 60 * 60 * 24;
const days = ["yesterday", "today", "tomorrow"];

export default function () {
	const today = new Date();
	// redux
	const { locale } = useSelector((state) => state.lang);
	const { globalDate } = useSelector((state) => state.globalDate);

	return useMemo(() => {
		let titleDay, subtitleDate;
		const formattedDate = new Intl.DateTimeFormat(locale || "en", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(globalDate);
		const [day, month, year] = formattedDate.split(/[،|,] /g);
		// diff in milliseconds
		const todayDate = new Date(today).getTime();
		const reduxGlobalDate = new Date(globalDate).getTime();
		const diff = todayDate - reduxGlobalDate;
		// title Day
		if (diff <= dayInMs && diff >= 0) titleDay = days[1];
		else if (diff >= -dayInMs && diff < 0) titleDay = days[2];
		else if (diff > dayInMs && diff <= dayInMs * 2) titleDay = days[0];
		else titleDay = day;
		// subtitle Date
		if (days.indexOf(titleDay) !== -1) {
			subtitleDate = [day, month, year].join(" ");
		} else subtitleDate = [month, year].join(" ");
		return { titleDay, subtitleDate, formattedDate };
	}, [globalDate]);
}

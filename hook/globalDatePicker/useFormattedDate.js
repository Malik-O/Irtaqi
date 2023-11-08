import { useMemo } from "react";
// redux
import { useSelector } from "react-redux";
// utils
import getWeeksArray from "../../utils/getWeeksArray";

export default function () {
	// redux
	const { locale } = useSelector((state) => state.lang);
	const { globalDate } = useSelector((state) => state.globalDate);

	return useMemo(() => {
		const formattedDate = new Intl.DateTimeFormat(locale || "en", {
			dateStyle: "full",
		}).format(globalDate);
		const titleDay = formattedDate.split(/ /g)[0];
		const subtitleDate = formattedDate.split(/ /g).slice(0, 3);
		return { titleDay, subtitleDate };
	}, [globalDate]);
}

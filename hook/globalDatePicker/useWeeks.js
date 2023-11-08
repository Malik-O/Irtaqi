import { useMemo } from "react";
// redux
import { useSelector } from "react-redux";
// utils
import getWeeksArray from "../../utils/getWeeksArray";

export default function () {
	const { globalDate } = useSelector((state) => state.globalDate);
	const monthWeeks = useMemo(
		() =>
			getWeeksArray(globalDate.getFullYear(), globalDate.getMonth() + 1),
		[globalDate],
	);
	const selectedRow = useMemo(
		() =>
			monthWeeks.reduce((acc, week, i) => {
				if (week.indexOf(globalDate.getDate()) !== -1) return i;
				return acc;
			}, 0),
		[monthWeeks],
	);
	return { monthWeeks, selectedRow };
}

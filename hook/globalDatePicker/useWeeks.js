import { useEffect, useMemo } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../store/globalDate";
// utils
import getWeeksArray from "../../utils/getWeeksArray";

export default function () {
	const dispatch = useDispatch();
	const { selectedMonth, globalDate } = useSelector(
		(state) => state.globalDate,
	);
	useEffect(() => {
		dispatch(globalDateActions.setSelectedMonth(globalDate));
	}, [globalDate]);
	const monthWeeks = useMemo(
		() =>
			getWeeksArray(
				selectedMonth.getFullYear(),
				selectedMonth.getMonth() + 1,
			),
		[selectedMonth],
	);
	// console.log(
	// 	"ddddddddddd:",
	// 	monthWeeks.map((week) =>
	// 		week.map((day) => day.getDate() && extractISODate({ date: day })),
	// 	),
	// );
	const selectedRow = useMemo(
		() =>
			monthWeeks.reduce((acc, week, i) => {
				if (
					week
						.map((day) => day.getDate())
						.indexOf(selectedMonth.getDate()) !== -1
				)
					return i;
				return acc;
			}, 0),
		[monthWeeks],
	);
	// change month by a value
	function changeMonth(by) {
		selectedMonth.setDate(1);
		selectedMonth.setMonth(selectedMonth.getMonth() + by);
		// const afterChangingMonth = new Date(selectedMonth).setMonth(
		// 	selectedMonth.getMonth() + by,
		// );
		console.log("w:", selectedMonth.getMonth());
		dispatch(globalDateActions.setSelectedMonth(new Date(selectedMonth)));
		dispatch(globalDateActions.set(new Date(selectedMonth)));
	}
	return { monthWeeks, selectedRow, changeMonth };
}

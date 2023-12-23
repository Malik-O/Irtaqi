import { memo } from "react";
import { Pressable, View } from "react-native";
import styles from "../styles";
// redux
import { useSelector, useDispatch } from "react-redux";
import DayText from "./DayText";
import { useEffect } from "react";
//
import extractISODate from "../../../utils/extractISODate";

const today = new Date().toLocaleDateString("en-GB");

export default memo(function ({ handlePress, day, color }) {
	const { globalDate, selectedMonth } = useSelector(
		(state) => state.globalDate,
	);
	return (
		<Pressable onPress={() => handlePress(day)}>
			<DayText
				day={+extractISODate({ date: day, iso: false }).split("-")[0]}
				isThisMonth={selectedMonth.getMonth() === day.getMonth()}
				isToday={
					extractISODate({ iso: false }) ===
					extractISODate({ date: day, iso: false })
				}
				isSelected={
					extractISODate({ date: globalDate, iso: false }) ===
					extractISODate({ date: day, iso: false })
				}
				color={color}
			/>
		</Pressable>
	);
});

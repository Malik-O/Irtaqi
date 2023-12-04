import { View } from "react-native";
// components
import DayButton from "./DayButton";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../../store/globalDate";
// hook
import useWeeks from "../../../hook/globalDatePicker/useWeeks";
// styles
import styles from "../styles";

export default function ({ color }) {
	const { monthWeeks, selectedRow } = useWeeks();
	// console.log("monthWeeks:", monthWeeks, selectedRow);
	const { globalDate } = useSelector((state) => state.globalDate);
	const dispatch = useDispatch();
	// handle button events
	const handlePress = (day) => {
		const date = globalDate.setDate(day);
		dispatch(globalDateActions.set(day));
	};

	return monthWeeks.map((week, i) => (
		<View key={i} style={styles.calendarRow}>
			{week.map((day, i) => (
				<DayButton
					handlePress={handlePress}
					day={day}
					key={i}
					color={color}
				/>
			))}
		</View>
	));
}

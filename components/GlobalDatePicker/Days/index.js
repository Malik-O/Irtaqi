import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
// components
import DayButton from "./DayButton";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../../store/globalDate";
// hook
import useWeeks from "../../../hook/globalDatePicker/useWeeks";
import useAnimationBlock from "../../../hook/useAnimationBlock";
// styles
import styles from "../styles";

export default function ({ color, animationList }) {
	// add animation block
	const { addAnimationBlock } = useAnimationBlock(animationList);
	// redux
	const dispatch = useDispatch();
	const { monthWeeks, selectedRow } = useWeeks();
	const { globalDate } = useSelector((state) => state.globalDate);
	// handle button events
	const handlePress = (day) => {
		const date = globalDate.setDate(day);
		dispatch(globalDateActions.set(day));
	};

	return monthWeeks.map((week, i) => (
		<Animated.View
			key={i}
			style={styles.calendarRow}
			entering={addAnimationBlock(FadeInDown, 500, -300)}
		>
			{week.map((day, i) => (
				<DayButton
					handlePress={handlePress}
					day={day}
					key={i}
					color={color}
				/>
			))}
		</Animated.View>
	));
}

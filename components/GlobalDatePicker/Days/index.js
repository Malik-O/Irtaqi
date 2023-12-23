import { memo } from "react";
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

export default memo(function ({ color, animationList, onStatusChanges }) {
	// add animation block
	const { addAnimationBlock } = useAnimationBlock();
	// redux
	const dispatch = useDispatch();
	const { monthWeeks, selectedRow } = useWeeks();
	const { globalDate } = useSelector((state) => state.globalDate);
	// handle button events
	const handlePress = (day) => {
		onStatusChanges(0);
		dispatch(globalDateActions.set(day));
	};

	return monthWeeks.map((week, i) => (
		<Animated.View
			key={i}
			style={styles.calendarRow}
			entering={addAnimationBlock(FadeInDown, 500, -500)}
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
});

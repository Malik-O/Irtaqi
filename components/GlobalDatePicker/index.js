import { View, Button } from "react-native";
import { useEffect, useMemo, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
	useDerivedValue,
} from "react-native-reanimated";
// components
import ScreenText from "../ScreenText";
import DayButton from "./DayButton";
import DayText from "./DayText";
import styles, { dayButtonTextInnerHight } from "./styles";
import { paddingHorizontal } from "../../styles/layout";
// redux
import { useSelector } from "react-redux";
// hook
import useTranslate from "../../hook/useTranslate";
import useWeeks from "../../hook/globalDatePicker/useWeeks";
import useFormattedDate from "../../hook/globalDatePicker/useFormattedDate";

export default function ({ collapseOpen }) {
	useEffect(() => {
		// console.log("render:");
	});
	const translate = useTranslate();
	const { monthWeeks, selectedRow } = useWeeks();
	// const [isCollapseOpen, setIsCollapseOpen] = useState(false);
	// language support
	const formattedDate = useFormattedDate();
	//
	const translateY = useDerivedValue(
		() => -dayButtonTextInnerHight * selectedRow,
	);
	const height = useSharedValue(dayButtonTextInnerHight);
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		height:
			dayButtonTextInnerHight * monthWeeks.length ** collapseOpen.value,
		overflow: "hidden",
	}));
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY:
					-dayButtonTextInnerHight *
					selectedRow *
					interpolate(collapseOpen.value, [0, 1], [1, 0]),
			},
		],
	}));
	// close the calendar
	// function collapseOpen() {
	// 	translateY.value = 0;
	// 	height.value = dayButtonTextInnerHight * monthWeeks.length;
	// }
	// function collapseClose() {
	// 	translateY.value = -dayButtonTextInnerHight * selectedRow;
	// 	height.value = dayButtonTextInnerHight;
	// }

	return (
		<View style={{ paddingHorizontal }}>
			{/* <Button
				title="collapse"
				onPress={() => collapseOpen(!isCollapseOpen)}
			/> */}
			<ScreenText reverse variant="headlineSmall">
				{formattedDate.subtitleDate}
			</ScreenText>
			{/* <ScreenText reverse>{subtitleDate?.join(" ")}</ScreenText> */}
			{/* days titles */}
			<View style={styles.calendarRow}>
				{translate("weekDaysShort").map((day, i) => (
					<DayText day={day} key={i} />
				))}
			</View>
			{/* weeks rows */}
			<Animated.View style={containerAnimatedStyle}>
				<Animated.View
					style={[contentAnimatedStyle, { flexDirection: "column" }]}
				>
					{monthWeeks.map((week, i) => (
						<View key={i} style={styles.calendarRow}>
							{week.map((day, i) => (
								<DayButton
									collapseClose={() => {
										// (collapseOpen.value = withTiming(0))
									}}
									day={day}
									key={i}
								/>
							))}
						</View>
					))}
				</Animated.View>
			</Animated.View>
		</View>
	);
}

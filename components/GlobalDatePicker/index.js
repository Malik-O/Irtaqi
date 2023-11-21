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
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../store/globalDate";
// hook
import useTranslate from "../../hook/useTranslate";
import useWeeks from "../../hook/globalDatePicker/useWeeks";
import useFormattedDate from "../../hook/globalDatePicker/useFormattedDate";

function Days() {
	const { monthWeeks, selectedRow } = useWeeks();
	const { globalDate } = useSelector((state) => state.globalDate);
	const dispatch = useDispatch();
	// handle button events
	const handlePress = (day) => {
		const date = globalDate.setDate(day);
		dispatch(globalDateActions.set(new Date(date)));
	};

	return monthWeeks.map((week, i) => (
		<View key={i} style={styles.calendarRow}>
			{week.map((day, i) => (
				<DayButton handlePress={handlePress} day={day} key={i} />
			))}
		</View>
	));
}

export default function ({ collapseOpen }) {
	const translate = useTranslate();
	const { monthWeeks, selectedRow } = useWeeks();
	// language support
	const formattedDate = useFormattedDate();
	//
	const containerAnimatedStyle = useAnimatedStyle(
		() => ({
			height:
				dayButtonTextInnerHight *
				monthWeeks.length ** collapseOpen.value,
			overflow: "hidden",
		}),
		[collapseOpen, monthWeeks.length],
	);
	const contentAnimatedStyle = useAnimatedStyle(
		() => ({
			transform: [
				{
					translateY:
						-dayButtonTextInnerHight *
						selectedRow *
						interpolate(collapseOpen.value, [0, 1], [1, 0]),
				},
			],
		}),
		[selectedRow, collapseOpen],
	);
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
			<ScreenText
				reverse
				variant="headlineSmall"
				// style={{ backgroundColor: "blue", height: 200 }}
			>
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
					<Days />
				</Animated.View>
			</Animated.View>
		</View>
	);
}

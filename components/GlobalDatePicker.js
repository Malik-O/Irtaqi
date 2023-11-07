import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useDerivedValue,
	runOnJS,
} from "react-native-reanimated";
// components
import { Button as PaperButton } from "react-native-paper";
import ScreenText from "./ScreenText";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../store/globalDate";
// hook
import useTranslate from "../hook/useTranslate";
// utils
import getWeeksArray from "../utils/getWeeksArray";

function DayText({ day, isSelected }) {
	return (
		<View style={styles.dayButton(isSelected)}>
			<ScreenText style={styles.dayButtonText}>{day}</ScreenText>
		</View>
	);
}
function DayButton({ collapseClose, day }) {
	const { globalDate } = useSelector((state) => state.globalDate);
	const dispatch = useDispatch();
	// handle button events
	const handlePress = (day) => {
		const date = globalDate.setDate(day);
		dispatch(globalDateActions.set(new Date(date)));
		collapseClose();
	};
	return (
		<TouchableOpacity onPress={() => handlePress(day)}>
			<DayText day={day} isSelected={globalDate.getDate() === day} />
		</TouchableOpacity>
	);
}

// const sizes
const dayButtonTextSize = 20;
const dayButtonTextPaddingVertical = 15;
const dayButtonTextInnerHight =
	dayButtonTextSize + dayButtonTextPaddingVertical * 2;

export default function globalDatePicker() {
	useEffect(() => {
		console.log("render:");
	});
	const translate = useTranslate();
	const [isCollapseOpen, setIsCollapseOpen] = useState(false);
	// redux
	const { locale } = useSelector((state) => state.lang);
	const { globalDate } = useSelector((state) => state.globalDate);
	const monthWeeks = useMemo(
		() =>
			getWeeksArray(globalDate.getFullYear(), globalDate.getMonth() + 1),
		[globalDate],
	);
	//
	const selectedRow = useMemo(
		() =>
			monthWeeks.reduce((acc, week, i) => {
				if (week.indexOf(globalDate.getDate()) !== -1) return i;
				return acc;
			}, 0),
		[monthWeeks],
	);
	// language support
	const formattedDate = new Intl.DateTimeFormat(locale || "en", {
		dateStyle: "full",
	}).format(globalDate);
	const titleDay = formattedDate.split(/ /g)[0];
	const subtitleDate = formattedDate.split(/ /g).slice(0, 3);
	//
	const translateY = useDerivedValue(
		() => -dayButtonTextInnerHight * selectedRow,
	);
	const height = useSharedValue(dayButtonTextInnerHight);
	const containerAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(
				dayButtonTextInnerHight * monthWeeks.length ** isCollapseOpen,
			),
			overflow: "hidden",
			// backgroundColor: "red",
		};
	});
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: isCollapseOpen
					? 0
					: withTiming(-dayButtonTextInnerHight * selectedRow),
			},
		],
	}));
	// close the calendar
	function collapseOpen() {
		translateY.value = 0;
		height.value = dayButtonTextInnerHight * monthWeeks.length;
	}
	function collapseClose() {
		translateY.value = -dayButtonTextInnerHight * selectedRow;
		height.value = dayButtonTextInnerHight;
	}

	return (
		<View>
			<Button
				title="collapse"
				onPress={() => setIsCollapseOpen(!isCollapseOpen)}
			/>
			<ScreenText reverse>{titleDay}</ScreenText>
			<ScreenText reverse>{subtitleDate?.join(" ")}</ScreenText>
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
									collapseClose={collapseClose}
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

const styles = StyleSheet.create({
	dayButton: (selected) => ({
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: dayButtonTextPaddingVertical,
		backgroundColor: selected ? "rgba(255, 255, 255, 0.5)" : null,
		justifyContent: "center",
	}),
	dayButtonText: {
		width: dayButtonTextSize,
		height: dayButtonTextSize,
		textAlign: "center",
	},
	calendarRow: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});

import { View, Text } from "react-native";
import { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import {
	useSharedValue,
	useDerivedValue,
	runOnJS,
} from "react-native-reanimated";
// components
import Wrapper from "./Wrapper";

export default function ({
	children,
	list,
	selectedNumberState: [selectedNumber, setSelectedNumber],
	onSlide,
	style,
}) {
	const percent = useRef(useSharedValue(0.5)).current;
	// change the state when step
	useDerivedValue(() => {
		const newSelectedNumber = Math.round(percent.value * list.length - 1);
		// when percentage changes an index then change the state (for optimization purposes)
		if (selectedNumber !== newSelectedNumber)
			runOnJS(setSelectedNumber)(newSelectedNumber);
	}, [selectedNumber, percent]);
	// play vibration when selected item changes
	useEffect(() => {
		const selectedFromPercent = Math.round(percent.value * list.length - 1);
		// console.log(
		// 	"selectedFromPercent:",
		// 	selectedFromPercent,
		// 	percent.value,
		// 	list.length,
		// );
		if (selectedFromPercent === selectedNumber) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
		// when changing from outside
		else {
			percent.value = selectedNumber / list.length;
		}
	}, [selectedNumber]);
	// on change event
	function onChange(newVal) {
		percent.value = newVal;
		onSlide(Math.round(percent.value * list.length - 1));
	}
	return (
		<View style={style}>
			<Wrapper percent={percent} onChange={onChange}>
				{children}
			</Wrapper>
		</View>
	);
}

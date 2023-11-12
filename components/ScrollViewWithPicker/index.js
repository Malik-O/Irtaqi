import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Animated, {
	interpolate,
	useDerivedValue,
	useSharedValue,
	Extrapolation,
	useAnimatedStyle,
} from "react-native-reanimated";
import GlobalDatePicker from "../../components/GlobalDatePicker";
import CollapseIndicator from "./CollapseIndicator";
// styles
import { dayButtonTextInnerHight } from "../GlobalDatePicker/styles";
import {
	MIN_BUBBLE_HEIGHT,
	MAX_BUBBLE_SHIFT,
	minHeight,
	navigateHight,
} from "./styles";
// hook
import useWeeks from "../../hook/globalDatePicker/useWeeks";
// Components
import ScrollView from "./ScrollView";
import Canvas from "./Canvas";

export default function () {
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	const CalendarDim = useRef(useSharedValue({})).current;
	const translateY = useRef(useSharedValue(zero)).current;
	// calc month weeks
	const { monthWeeks } = useWeeks();
	const datePickerFullHeight = dayButtonTextInnerHight * monthWeeks.length;
	const inputRange = [
		MIN_BUBBLE_HEIGHT + minHeight,
		MIN_BUBBLE_HEIGHT + datePickerFullHeight - MAX_BUBBLE_SHIFT,
	];
	// some shared values
	const bubbleHeight = useRef(useSharedValue(inputRange[1])).current;
	const bubbleShift = useRef(useSharedValue(0)).current;
	const collapseOpen = useRef(useSharedValue(0)).current;
	// bubble updates
	useDerivedValue(() => {
		bubbleHeight.value = interpolate(
			collapseOpen.value,
			[0, 1],
			inputRange,
			Extrapolation.CLAMP,
		);
	}, [collapseOpen]);
	useDerivedValue(() => {
		collapseOpen.value = interpolate(
			translateY.value,
			[MIN_BUBBLE_HEIGHT + datePickerFullHeight, zero + navigateHight],
			[0, 1],
			Extrapolation.CLAMP,
		);
	}, [translateY]);
	//
	const scrollViewStyle = useAnimatedStyle(
		() => ({
			paddingTop:
				CalendarDim.value.height + bubbleShift.value + navigateHight ||
				0,
		}),
		[CalendarDim],
	);
	//
	const datePickerStyle = useAnimatedStyle(() => {
		const transformTranslateY =
			translateY.value < navigateHight + zero
				? interpolate(
						translateY.value,
						[navigateHight + zero, zero],
						[0, navigateHight],
						Extrapolation.CLAMP,
				  )
				: 0;
		return { transform: [{ translateY: transformTranslateY }] };
	}, [translateY]);
	return (
		<SafeAreaView style={StyleSheet.absoluteFill}>
			{/* children */}
			<ScrollView animatedStyle={scrollViewStyle} translateY={translateY}>
				<View
					style={{
						height: 300,
						width: 50,
						backgroundColor: "yellow",
					}}
				/>
				<View
					style={{ height: 3000, width: 50, backgroundColor: "red" }}
				/>
			</ScrollView>
			<View
				style={[
					{ width: "100%", position: "absolute", top: zero, left: 0 },
				]}
				onLayout={(event) =>
					(CalendarDim.value = event.nativeEvent.layout)
				}
			>
				<Animated.View style={datePickerStyle}>
					<GlobalDatePicker collapseOpen={collapseOpen} />
				</Animated.View>
				<Canvas
					translateY={translateY}
					collapseOpen={collapseOpen}
					inputRange={inputRange}
					zero={zero}
				/>
			</View>
		</SafeAreaView>
	);
}

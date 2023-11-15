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
//
import clamp from "../../utils/clamp";
// Components
import ScrollView from "./ScrollView";
import Canvas from "./Canvas";
import ScrollGesture from "../ScrollGesture";

function navigationArea({ translateX }) {
	const dotStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));
	return (
		<Animated.View
			style={[
				dotStyle,
				{ backgroundColor: "red", width: 50, height: 50 },
			]}
		/>
	);
}

export default function () {
	// calc zero
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	// some shared values
	const CalendarDim = useRef(useSharedValue({})).current;
	const translateY = useRef(useSharedValue(0)).current;
	const translateX = useRef(useSharedValue(0)).current;
	// calc month weeks
	const { monthWeeks } = useWeeks();
	const datePickerFullHeight = dayButtonTextInnerHight * monthWeeks.length;
	const inputRange = [
		MIN_BUBBLE_HEIGHT,
		MIN_BUBBLE_HEIGHT + datePickerFullHeight - MAX_BUBBLE_SHIFT,
	];
	// some shared values
	const bubbleHeight = useRef(useSharedValue(inputRange[1])).current;
	// const bubbleShift = useRef(useSharedValue(0)).current;
	const collapseOpen = useRef(useSharedValue(0)).current;
	// bubble updates
	useDerivedValue(() => {
		// console.log("collapseOpen:", collapseOpen.value);
		bubbleHeight.value = interpolate(
			collapseOpen.value,
			[0, 1],
			inputRange,
			Extrapolation.CLAMP,
		);
	}, [collapseOpen]);
	useDerivedValue(() => {
		// console.log("collapseOpen:", collapseOpen.value);
		collapseOpen.value = interpolate(
			translateY.value,
			[datePickerFullHeight - zero, 0],
			[0, 1],
			Extrapolation.CLAMP,
		);
	}, [translateY]);
	//
	const scrollViewStyle = useAnimatedStyle(() => {
		// console.log("bubbleShift:", zero);
		return {
			paddingTop: CalendarDim.value.height + zero + MAX_BUBBLE_SHIFT || 0,
		};
	}, [CalendarDim]);
	//
	const datePickerStyle = useAnimatedStyle(() => {
		const transformTranslateY = clamp(translateY.value, -navigateHight, 0);
		return { transform: [{ translateY: -transformTranslateY }] };
	}, [translateY]);
	return (
		<ScrollGesture
			navigationArea={navigationArea({ translateX })}
			navigateHight={navigateHight}
			translateY={translateY}
			translateX={translateX}
			animatedStyle={scrollViewStyle}
			headerComponent={
				<View
					style={[
						{
							width: "100%",
							zIndex: 10,
							position: "absolute",
							top: zero,
							left: 0,
						},
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
			}
		>
			<View
				style={{
					height: 300,
					width: 50,
					backgroundColor: "yellow",
				}}
			/>
			<View style={{ height: 3000, width: 50, backgroundColor: "red" }} />
		</ScrollGesture>
	);
}

import { useRef, useMemo, memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Animated, {
	interpolate,
	useDerivedValue,
	useSharedValue,
	Extrapolation,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// styles
import { dayButtonTextInnerHight } from "../GlobalDatePicker/styles";
import { MIN_BUBBLE_HEIGHT, MAX_BUBBLE_SHIFT, navigateHight } from "./styles";
// hook
import useWeeks from "../../hook/globalDatePicker/useWeeks";
import useZero from "../../hook/useZero";
// Components
import ScrollGesture from "../ScrollGesture";
import ScreenView from "../ScreenView";
import HeaderComponent from "./HeaderComponent";
import NavigationArea from "./NavigationArea";

export default function ({
	children,
	navigationData,
	hasNavigationHeader = true,
	onRefresh,
}) {
	const zero = useZero();
	// some shared values
	const CalendarHight = useSharedValue(0);
	const translateY = useSharedValue(0);
	const translateX = useSharedValue(0);
	// calc month weeks
	const { monthWeeks } = useWeeks();
	const datePickerFullHeight = useMemo(
		() => dayButtonTextInnerHight * monthWeeks.length,
		[monthWeeks],
	);
	const inputRange = useDerivedValue(() => {
		return [
			CalendarHight.value || MIN_BUBBLE_HEIGHT,
			(CalendarHight.value || MIN_BUBBLE_HEIGHT) + MAX_BUBBLE_SHIFT,
		];
	}, [CalendarHight]);
	// some shared values
	const bubbleHeight = useSharedValue(inputRange.value[1]);
	// const bubbleShift = useRef(useSharedValue(0)).current;
	const collapseOpen = useSharedValue(1);
	// console.log("updated:");
	// bubble updates
	useDerivedValue(() => {
		// console.log("collapseOpen:", collapseOpen.value);
		bubbleHeight.value = interpolate(
			collapseOpen.value,
			[0, 1],
			inputRange.value,
			Extrapolation.CLAMP,
		);
	}, [collapseOpen.value]);
	useDerivedValue(() => {
		// console.log("translateY:", translateY.value);
		collapseOpen.value = interpolate(
			translateY.value,
			[datePickerFullHeight / 3, 0],
			[0, 1],
			Extrapolation.CLAMP,
		);
	}, [translateY.value]);
	//
	const scrollViewStyle = useAnimatedStyle(() => {
		return {
			paddingTop: CalendarHight.value + zero + MAX_BUBBLE_SHIFT || 0,
		};
	}, [CalendarHight]);
	//
	return (
		<ScreenView paddingTop={false}>
			<ScrollGesture
				navigationArea={NavigationArea({
					translateY,
					translateX,
					navigationData,
					onRefresh,
				})}
				navigateHight={navigateHight}
				translateY={translateY}
				translateX={translateX}
				animatedStyle={scrollViewStyle}
				headerComponent={HeaderComponent({
					hasNavigationHeader,
					CalendarHight,
					translateY,
					translateX,
					collapseOpen,
					inputRange,
					navigationData,
				})}
				onRefresh={onRefresh}
			>
				{children}
			</ScrollGesture>
		</ScreenView>
	);
}

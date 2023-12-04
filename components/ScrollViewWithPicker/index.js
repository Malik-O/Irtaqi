import { useRef, useMemo, useEffect } from "react";
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
	const CalendarDim = useRef(useSharedValue({})).current;
	const translateY = useRef(useSharedValue(0)).current;
	const translateX = useRef(useSharedValue(0)).current;
	// redux
	const { globalDate } = useSelector((state) => state.globalDate);
	useEffect(() => {
		translateY.value = withTiming(0);
	}, [globalDate]);
	// const navHeaderHight = useRef(useSharedValue({})).current;
	// calc month weeks
	const { monthWeeks } = useWeeks();
	const datePickerFullHeight = useMemo(
		() => dayButtonTextInnerHight * monthWeeks.length,
		[monthWeeks],
	);
	const inputRange = useDerivedValue(() => {
		return [
			CalendarDim.value.height || MIN_BUBBLE_HEIGHT,
			(CalendarDim.value.height || MIN_BUBBLE_HEIGHT) + MAX_BUBBLE_SHIFT,
		];
	}, [CalendarDim]);
	// some shared values
	const bubbleHeight = useRef(useSharedValue(inputRange.value[1])).current;
	// const bubbleShift = useRef(useSharedValue(0)).current;
	const collapseOpen = useRef(useSharedValue(0)).current;
	// bubble updates
	useDerivedValue(() => {
		bubbleHeight.value = interpolate(
			collapseOpen.value,
			[0, 1],
			inputRange.value,
			Extrapolation.CLAMP,
		);
	}, [collapseOpen]);
	useDerivedValue(() => {
		collapseOpen.value = interpolate(
			translateY.value,
			[datePickerFullHeight / 3, 0],
			[0, 1],
			Extrapolation.CLAMP,
		);
	}, [translateY]);
	//
	const scrollViewStyle = useAnimatedStyle(() => {
		return {
			paddingTop: CalendarDim.value.height + zero + MAX_BUBBLE_SHIFT || 0,
		};
	}, [CalendarDim]);
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
					CalendarDim,
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

import { View, Text } from "react-native";
import React from "react";
// animation
import Animated, {
	useAnimatedStyle,
	useAnimatedGestureHandler,
	interpolate,
	withSpring,
	useDerivedValue,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
// styles
import { dayButtonTextInnerHight } from "../GlobalDatePicker/styles";
import styles, {
	MAGIC_NUM,
	MIN_BUBBLE_HEIGHT,
	MAX_BUBBLE_SHIFT,
	minHeight,
} from "./styles";
// utils
import clamp from "../../utils/clamp";
// hook
import useWeeks from "../../hook/globalDatePicker/useWeeks";

export default function ({ bubbleShift, bubbleHeight }) {
	const { monthWeeks, selectedRow } = useWeeks();
	const datePickerFullHeight = dayButtonTextInnerHight * monthWeeks.length;
	const inputRange = [
		MIN_BUBBLE_HEIGHT,
		MIN_BUBBLE_HEIGHT + datePickerFullHeight,
	];
	//Gesture Handler Events
	function onFinish({ velocityY }) {
		"worklet";
		// if (
		// 	bubbleHeight.value - inputRange[0] <=
		// 	(inputRange[1] - inputRange[0]) / 2
		// )
		// 	bubbleHeight.value = withSpring(inputRange[0], {
		// 		velocity: velocityY,
		// 	});
		// else
		// 	bubbleHeight.value = withSpring(inputRange[1], {
		// 		velocity: velocityY,
		// 	});
		//
		const snapPointX = snapPoint(bubbleHeight.value, velocityY, inputRange);
		bubbleHeight.value = withSpring(snapPointX, { velocity: velocityY });
		// isActive.value = false;
	}
	useDerivedValue(() => {
		bubbleShift.value = interpolate(bubbleHeight.value, inputRange, [
			0,
			MAX_BUBBLE_SHIFT,
		]);
	}, [bubbleHeight]);
	const panGestureEvent = useAnimatedGestureHandler({
		onStart(event, context) {
			// isActive.value = true;
			context.prevTranslateY = bubbleHeight.value;
		},
		onActive(event, context) {
			const newTranslateY = event.translationY + context.prevTranslateY;

			newTranslateY = clamp(newTranslateY, ...inputRange);
			// bubbleShift.value = interpolate(bubbleHeight.value, inputRange, [
			// 	0,
			// 	MAX_BUBBLE_SHIFT,
			// ]);
			bubbleHeight.value = newTranslateY;
		},
		onEnd: onFinish,
		onCancel: onFinish,
		onFail: onFinish,
	});
	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY:
					bubbleHeight.value -
					interpolate(
						bubbleShift.value,
						[0, MAX_BUBBLE_SHIFT],
						[minHeight, 0],
					),
			},
		],
	}));

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View
				style={[
					indicatorStyle,
					styles.indicator(bubbleShift.value * (1 - MAGIC_NUM)),
				]}
			>
				<Animated.View style={styles.indicatorLine} />
			</Animated.View>
		</PanGestureHandler>
	);
}

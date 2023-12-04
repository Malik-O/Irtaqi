import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useRef, useState } from "react";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	Easing,
	withTiming,
	useDerivedValue,
	runOnJS,
} from "react-native-reanimated";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
// hook
import useZero from "../hook/useZero";

const { height, width } = Dimensions.get("screen");
export default function ScrollGesture({
	children,
	headerComponent,
	navigateHight,
	scrollHeight = height,
	translateY,
	translateX,
	animatedStyle,
	navigationArea,
	onRefresh,
}) {
	const zero = useZero();
	// some shared values
	const contentHeight = useRef(useSharedValue(0)).current;
	const onLayout = (event) => {
		if (contentHeight.value !== event.nativeEvent.layout.height)
			contentHeight.value = event.nativeEvent.layout.height;
	};
	const clamp_range = useDerivedValue(
		() => [0, contentHeight.value - height / 4],
		[contentHeight, scrollHeight],
	);
	const onRefreshWrapper = (args) => onRefresh(args);

	const pan = Gesture.Pan()
		.onTouchesDown(() => {
			// stop scrolling
			translateY.value = translateY.value;
		})
		.onUpdate((event) => {
			// if (translateY.value >= navigateHight) {
			// 	console.log("event:", event);
			// }
		})
		.onChange((event) => {
			if (translateY.value - event.changeY < clamp_range.value[1]) {
				translateY.value -= event.changeY;
			}
			if (translateY.value <= -navigateHight / 2) {
				translateX.value += event.changeX;
			}
		})
		.onFinalize((event) => {
			if (translateY.value < clamp_range.value[0]) {
				if (translateY.value <= -navigateHight && onRefresh) {
					runOnJS(Haptics.notificationAsync)(
						Haptics.NotificationFeedbackType.Success,
					);
					runOnJS(onRefresh)();
				}
				translateY.value = withTiming(clamp_range.value[0]);
			}
			// else if (translateY.value < clamp_range.value[1])
			// 	translateY.value = withTiming(clamp_range.value[1]);
			else
				translateY.value = withDecay({
					velocity: -event.velocityY,
					rubberBandEffect: true,
					rubberBandFactor: 0.9,
					clamp: clamp_range.value,
				});
		});
	const contentStyle = useAnimatedStyle(
		() => ({
			transform: [{ translateY: -translateY.value }],
		}),
		[translateY],
	);
	const navigateStyle = useAnimatedStyle(
		() => ({ opacity: +(translateY.value < 0) }),
		[translateY],
	);

	return (
		<View>
			<Animated.View
				style={[
					navigateStyle,
					{
						// backgroundColor: "cyan",
						width: "100%",
						height: navigateHight,
						justifyContent: "center",
						alignItems: "center",
						// zIndex: 10,
						position: "absolute",
						top: zero,
						left: 0,
					},
				]}
			>
				{navigationArea}
			</Animated.View>
			<GestureHandlerRootView style={styles.container}>
				<GestureDetector gesture={pan}>
					<Animated.View
						style={[
							animatedStyle,
							{
								// backgroundColor: "blue",
								width,
								height: scrollHeight,
								overflow: "hidden",
							},
						]}
					>
						{headerComponent}
						<Animated.View
							style={[
								contentStyle,
								{
									paddingTop: 40,
									// backgroundColor: "green",
								},
							]}
							onLayout={onLayout}
						>
							{children}
						</Animated.View>
					</Animated.View>
				</GestureDetector>
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	wrapper: {
		flex: 1,
		width: "100%",
	},
});

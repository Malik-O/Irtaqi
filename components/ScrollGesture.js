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
} from "react-native-reanimated";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";

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
}) {
	// calc zero
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	// some shared values
	const contentHeight = useRef(useSharedValue(0)).current;
	const onLayout = (event) => {
		contentHeight.value = event.nativeEvent.layout.height;
	};
	const clamp_range = useDerivedValue(
		() => [0, contentHeight.value - scrollHeight],
		[contentHeight, scrollHeight],
	);
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
			translateY.value -= event.changeY;
			if (translateY.value <= -navigateHight / 2) {
				translateX.value += event.changeX;
			}
			// console.log("0:", translateY.value);
		})
		.onFinalize((event) => {
			// console.log("clamp_range:", clamp_range);
			if (translateY.value < clamp_range.value[0])
				translateY.value = withTiming(clamp_range.value[0]);
			else if (translateY.value > clamp_range.value[1])
				translateY.value = withTiming(clamp_range.value[1]);
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
			// paddingTop: zero,
			transform: [{ translateY: -translateY.value }],
		}),
		[translateY],
	);
	//
	const singleTap = Gesture.Tap()
		.maxDuration(250)
		.onStart(() => {
			console.log("Single tap!");
		});

	return (
		<View>
			<View
				style={{
					backgroundColor: "cyan",
					width: "100%",
					height: navigateHight,
					justifyContent: "center",
					alignItems: "center",
					// zIndex: 10,
					position: "absolute",
					top: zero,
					left: 0,
				}}
			>
				{navigationArea}
			</View>
			<GestureHandlerRootView style={styles.container}>
				<GestureDetector gesture={Gesture.Exclusive(pan)}>
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
							style={[contentStyle, { backgroundColor: "green" }]}
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

import { View } from "react-native";
import { useRef, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { titlePaddingVertical } from "./styles";
// components
import AnimatedHeader from "./AnimatedHeader";

export default function ({ children }) {
	const translateY = useRef(useSharedValue(0)).current;
	const titleDim = useRef(useSharedValue({})).current;
	// update translateY on scroll
	function onScroll(e) {
		translateY.value = e.nativeEvent.contentOffset.y;
	}
	function onScrollStop(e) {
		const titleHight = titleDim.value.height + titlePaddingVertical * 2;
		// step on between animation
		let val = 0;
		if (translateY.value > titleHight) return;
		if (translateY.value >= titleHight / 2) {
			val = titleHight;
		}
		e.target.scrollTo({ y: val });
		translateY.value = withTiming(val);
	}
	return (
		<Animated.ScrollView
			onScroll={onScroll}
			onScrollEndDrag={onScrollStop}
			onMomentumEnd={onScrollStop}
			scrollEventThrottle={16}
		>
			<AnimatedHeader
				title="Groups"
				translateY={translateY}
				titleDim={titleDim}
			/>
			{children}
		</Animated.ScrollView>
	);
}

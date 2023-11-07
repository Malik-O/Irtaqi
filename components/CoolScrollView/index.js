import { Platform, StatusBar } from "react-native";
import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
import { titlePaddingVertical } from "./styles";
// components
import AnimatedHeader from "./AnimatedHeader";

export default function ({ children, props }) {
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	const translateY = useRef(useSharedValue(zero)).current;
	const titleDim = useRef(useSharedValue({})).current;
	// update translateY on scroll
	function onScroll(e) {
		translateY.value = e.nativeEvent.contentOffset.y + zero;
	}
	function onScrollStop(e) {
		const titleHight = titleDim.value.height + titlePaddingVertical * 2;
		// step on between animation
		let val = 0;
		if (translateY.value - zero > titleHight) return;
		if (translateY.value - zero >= titleHight / 2) {
			val = titleHight;
		}
		e.target.scrollTo({ y: val });
		translateY.value = withTiming(val);
	}
	const scrollViewStyle = useAnimatedStyle(() => ({
		paddingTop:
			zero + titleDim.value.height + titlePaddingVertical * 2 || zero,
	}));
	// return Platform dependent
	if (Platform.OS === "ios")
		return (
			<Animated.ScrollView
				onScroll={onScroll}
				onScrollEndDrag={onScrollStop}
				onMomentumEnd={onScrollStop}
				scrollEventThrottle={16}
			>
				<AnimatedHeader
					props={props}
					translateY={translateY}
					titleDim={titleDim}
				/>
				{children}
			</Animated.ScrollView>
		);
	else
		return (
			<>
				<AnimatedHeader
					props={props}
					translateY={translateY}
					titleDim={titleDim}
				/>
				<Animated.ScrollView
					onScroll={onScroll}
					onScrollEndDrag={onScrollStop}
					onMomentumEnd={onScrollStop}
					scrollEventThrottle={16}
					style={scrollViewStyle}
				>
					{children}
				</Animated.ScrollView>
			</>
		);
}

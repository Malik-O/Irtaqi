import { Platform, useColorScheme } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
	useAnimatedProps,
} from "react-native-reanimated";
// hook
import useZero from "../../hook/useZero";
// Blur View
import { BlurView } from "expo-blur";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// styles
import styles, { titlePaddingVertical } from "./styles";

export default function BG({ titleDim, translateY }) {
	const colorScheme = useColorScheme();
	const zero = useZero();
	// animated styles
	const bgStyle = useAnimatedStyle(() => {
		const transform = [];
		if (Platform.OS === "ios")
			transform.push({ translateY: -titleDim.value.height || 0 });
		return {
			transform,
			height: titleDim.value.height + zero + titlePaddingVertical || 0,
		};
	});
	const intensity = useAnimatedProps(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical * 2;
		const inputRange = [zero, titleHeight || zero];
		const extrapolations = {
			extrapolateRight: "clamp",
			extrapolateLeft: "clamp",
		};
		const interpolateCustom = (out) =>
			interpolate(translateY.value, inputRange, out, extrapolations);
		return { intensity: interpolateCustom([0, 100]) };
	});
	if (Platform.OS === "ios")
		return (
			<AnimatedBlurView
				animatedProps={intensity}
				// intensity={100}
				tint={colorScheme}
				style={[styles.blurView, bgStyle]}
			/>
		);
	else
		return (
			<Animated.View
				style={[styles.blurView, { backgroundColor: "red" }, bgStyle]}
			/>
		);
}

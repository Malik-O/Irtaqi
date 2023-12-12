import { Platform, useColorScheme } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
	useAnimatedProps,
	interpolateColor,
} from "react-native-reanimated";
// hook
import useZero from "../../hook/useZero";
import useTheme from "../../hook/useTheme";
// Blur View
import { BlurView } from "expo-blur";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// styles
import styles, { titlePaddingVertical } from "./styles";

export default function BG({ titleDim, translateY }) {
	const theme = useTheme();
	const colorScheme = useColorScheme();
	const zero = useZero();
	// interpolate function
	function interpolateCustom(value, out, isColor) {
		"worklet";
		const titleHeight = titleDim.value.height + titlePaddingVertical * 2;
		const inputRange = [zero, titleHeight || zero];
		const extrapolations = {
			extrapolateRight: "clamp",
			extrapolateLeft: "clamp",
		};
		const selectedFunction = isColor ? interpolateColor : interpolate;
		return selectedFunction(
			value,
			inputRange,
			out,
			isColor ? "RGB" : extrapolations,
		);
	}
	// animated styles
	const bgStyle = useAnimatedStyle(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical * 2;
		const allStyles = {
			transform: [],
			height: titleDim.value.height + zero + titlePaddingVertical || 0,
		};
		if (Platform.OS === "ios")
			allStyles.transform.push({
				translateY: -titleDim.value.height || 0,
			});
		else
			allStyles.backgroundColor = interpolateCustom(
				translateY.value,
				["transparent", theme.secondary],
				true,
			);
		return allStyles;
	});
	// intensity prop
	const intensity = useAnimatedProps(() => {
		return { intensity: interpolateCustom(translateY.value, [0, 50]) };
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
	else return <Animated.View style={[styles.blurView, bgStyle]} />;
}

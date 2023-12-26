import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
	useAnimatedStyle,
	interpolateColor,
} from "react-native-reanimated";
// hook
import useTheme from "../../hook/useTheme";

export default function ({ style, animatedIndex }) {
	const theme = useTheme();
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			animatedIndex.value,
			[0, 1],
			[theme.secondary, theme.secondary],
			// ["#009688", theme.tertiary],
		),
	}));
	// render
	return (
		<Animated.View
			pointerEvents="none"
			style={[style, containerAnimatedStyle, { borderRadius: 20 }]}
		/>
	);
}

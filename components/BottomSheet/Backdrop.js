import { useMemo } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
// hook
import useTheme from "../../hook/useTheme";

export default function ({ animatedIndex, style }, sheetRef) {
	const theme = useTheme();
	// animated variables
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[-1, 0],
			[0, 1],
			Extrapolate.CLAMP,
		),
	}));
	// styles
	const containerStyle = useMemo(
		() => [
			style,
			containerAnimatedStyle,
			{ backgroundColor: theme.reverse.fadeSecondary },
		],
		[style, containerAnimatedStyle],
	);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				sheetRef.current.close();
			}}
		>
			<Animated.View style={containerStyle} />
		</TouchableWithoutFeedback>
	);
}

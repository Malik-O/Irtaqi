import { ActivityIndicator } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";
// component
import { MD2Colors } from "react-native-paper";
// const ActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);
// hooks
import useTheme from "../../hook/useTheme";
// style
import { navigateHight } from "./styles";

export default function ({ translateY, translateX, onRefresh }) {
	const theme = useTheme();
	const dotStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));
	const indicatorStyle = useAnimatedStyle(() => {
		const interpolatedValue = interpolate(
			translateY.value,
			[-navigateHight / 2, -navigateHight],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ scale: interpolatedValue }],
			opacity: interpolatedValue,
		};
	});
	if (onRefresh)
		return (
			<Animated.View style={indicatorStyle}>
				<ActivityIndicator
					animating={true}
					hidesWhenStopped={false}
					size="large"
					color={theme.primary}
				/>
			</Animated.View>
		);
	return (
		<Animated.View
			style={[
				dotStyle,
				{ backgroundColor: "red", width: 50, height: 50 },
			]}
		/>
	);
}

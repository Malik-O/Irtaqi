import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// component
import ScreenText from "./ScreenText";
//
import { paddingHorizontal } from "../styles/layout";
// hook
import useTheme from "../hook/useTheme";
import useTranslate from "../hook/useTranslate";
function deepEqual(x, y) {
	return x && y && typeof x === "object" && typeof y === "object"
		? Object.keys(x).length === Object.keys(y).length &&
				Object.keys(x).reduce(function (isEqual, key) {
					return isEqual && deepEqual(x[key], y[key]);
				}, true)
		: x === y;
}
export default function ({
	mutationAction,
	loading,
	title,
	color = "primary",
	disabled,
	style,
}) {
	const theme = useTheme();
	const translate = useTranslate();
	const opacityStyle = useAnimatedStyle((_) => ({
		opacity: loading || disabled ? withTiming(0.5) : withTiming(1),
	}));
	return (
		<TouchableOpacity
			onPress={mutationAction}
			disabled={loading || disabled}
		>
			<Animated.View
				style={[
					style,
					{
						backgroundColor: theme[color],
						textAlign: "center",
						// marginHorizontal: paddingHorizontal,
						borderRadius: paddingHorizontal,
						paddingVertical: paddingHorizontal / 2,
					},
					opacityStyle,
				]}
			>
				{loading ? (
					<ActivityIndicator />
				) : (
					<ScreenText
						variant="titleLarge"
						style={{
							textAlign: "center",
							color: theme.reverse.secondary,
						}}
					>
						{translate(title)}
					</ScreenText>
				)}
			</Animated.View>
		</TouchableOpacity>
	);
}

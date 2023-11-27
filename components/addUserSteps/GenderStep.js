import { View, Pressable } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
	interpolateColor,
	useSharedValue,
} from "react-native-reanimated";
// component
import ScreenText from "../ScreenText";
import { TouchableRipple } from "react-native-paper";
//
import useTheme from "../../hook/useTheme";
// style
import style from "../../styles/layout";

function Option(optionData) {
	const theme = useTheme();
	// animated style
	const cardColorProgress = useSharedValue(0);
	const optionStyle = useAnimatedStyle(() => ({
		borderWidth: optionData.active ? withTiming(2) : withTiming(0),
		backgroundColor: interpolateColor(
			cardColorProgress.value,
			[0, 1],
			[theme.cardColor, "transparent"],
		),
	}));
	return (
		<Pressable
			style={{
				width: "47%",
			}}
			onPressIn={() => (cardColorProgress.value = withTiming(1))}
			onPressOut={() => (cardColorProgress.value = withTiming(0))}
			onPress={() => (optionData.active = true)}
		>
			<Animated.View
				style={[
					optionStyle,
					{
						// width: "47%",
						height: 150,
						backgroundColor: theme.cardColor,
						borderColor: theme.reverse.secondary,
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 10,
					},
				]}
			>
				<ScreenText variant="headlineMedium">
					{optionData.title}
				</ScreenText>
			</Animated.View>
		</Pressable>
	);
}
export default function (
	_,
	options = [
		{ title: "Male", active: true },
		{ title: "Female", active: false },
	],
) {
	return (
		<View
			style={[
				style.planCardContainer(),
				{
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-between",
					paddingHorizontal: 0,
				},
			]}
		>
			{options.map(Option)}
		</View>
	);
}

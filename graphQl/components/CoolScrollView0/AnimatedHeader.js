import { View } from "react-native";
import { Stack } from "expo-router";
import { BlurView } from "expo-blur";
import Animated, {
	useAnimatedStyle,
	interpolate,
} from "react-native-reanimated";
// components
import ScreenText from "../ScreenText";
import styles, { titlePaddingVertical } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";

// const titlePaddingVertical = 20;
// const containerPaddingHorizontal = 20;

export default function ({ translateY, title, titleDim }) {
	const titleAnimatedStyle = useAnimatedStyle(() => {
		const titleHeight = titleDim.value.height + titlePaddingVertical;
		const inputRange = [0, titleHeight || 0];
		const extrapolations = {
			extrapolateRight: "clamp",
			extrapolateLeft: "clamp",
		};
		const interpolateCustom = (out) =>
			interpolate(translateY.value, inputRange, out, extrapolations);
		return {
			transform: [
				{ scale: interpolateCustom([1, 0.8]) },
				{
					translateX: interpolateCustom([
						-titleDim.value.x + titlePaddingVertical || 0,
						0,
					]),
				},
				{ translateY: interpolateCustom([titleHeight || 0, 0]) },
			],
		};
	});
	const headerContainerAnimatedStyle = useAnimatedStyle(() => {
		return {
			// paddingHorizontal: titlePaddingVertical,
			paddingBottom: 100,
			// paddingBottom:
			// 	titleDim.value.height + titlePaddingVertical * 2 || 0,
			transform: [{ translateY: translateY.value }],
		};
	});
	return (
		<Animated.View
			style={[styles.headerContainer, headerContainerAnimatedStyle]}
		>
			<Stack.Screen options={{ headerShown: false }} />
			<BlurView intensity={20} tint="dark" style={styles.blurView} />
			<View style={styles.headerButtons}>
				<Ionicons name="chevron-back" size={30} color="white" />
			</View>
			<Animated.View
				style={titleAnimatedStyle}
				onLayout={(event) =>
					(titleDim.value = event.nativeEvent.layout)
				}
			>
				<ScreenText variant="displayMedium">{title}</ScreenText>
			</Animated.View>
			<View style={styles.headerButtons}>
				<Ionicons name="chevron-back" size={30} color="white" />
			</View>
		</Animated.View>
	);
}

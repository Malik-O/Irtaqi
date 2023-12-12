import { TouchableWithoutFeedback } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate,
} from "react-native-reanimated";
import React, { Children, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
// components
import ScreenText from "./ScreenText";
// styles
import styles from "../styles/layout";
import useTheme from "../hook/useTheme";

export default function ({ item: { title } = {}, href, children, style }) {
	const theme = useTheme();
	// router
	const router = useRouter();
	// animation
	const isPressIn = useSharedValue(0);
	const cardStyle = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(isPressIn.value, [0, 1], [1, 0.95]) }],
	}));
	const config = { duration: 300 };
	return (
		<TouchableWithoutFeedback
			disabled={!href}
			onPressIn={() => {
				isPressIn.value = withSpring(1, config);
			}}
			onPressOut={() => {
				isPressIn.value = withSpring(0, config);
			}}
			onPress={() => {
				router.push(href);
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			}}
		>
			<Animated.View
				style={[
					styles.planCardContainer(theme.cardColor),
					cardStyle,
					// style,
				]}
			>
				{title ? (
					<ScreenText variant="bodyLarge">{title}</ScreenText>
				) : (
					children
				)}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

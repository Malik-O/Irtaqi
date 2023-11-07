import {
	useColorScheme,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
// components
import ScreenText from "./ScreenText";

export default function ({ item: { title }, href }) {
	const colorScheme = useColorScheme();
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
			onPressIn={() => {
				isPressIn.value = withSpring(1, config);
			}}
			onPressOut={() => {
				isPressIn.value = withSpring(0, config);
			}}
			onPress={() => {
				router.push(href);
			}}
		>
			<Animated.View
				style={[styles.planCardContainer(colorScheme), cardStyle]}
			>
				<ScreenText variant="bodyLarge">{title}</ScreenText>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	planCardContainer: (theme) => ({
		margin: 20,
		backgroundColor: theme === "light" ? "#ffffff" : "#1F2C33",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
	}),
});

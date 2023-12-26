import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
} from "react-native-reanimated";
// hook
import useTheme from "../../hook/useTheme";
// component
import ScreenText from "../ScreenText";
import { paddingHorizontal } from "../../styles/layout";

const Handle = ({ selectedPlan, style, animatedIndex }) => {
	const theme = useTheme();
	const isAlive = useAnimatedStyle(() => ({
		height: interpolate(animatedIndex.value, [0, 1], [0, 50]),
		opacity: interpolate(animatedIndex.value, [0, 1], [0, 1]),
		transform: [
			{ translateX: interpolate(animatedIndex.value, [0, 1], [20, 0]) },
		],
	}));
	// render
	return (
		<Animated.View
			style={[styles.header]}
			// renderToHardwareTextureAndroid={true}
		>
			<Animated.View
				style={[
					styles.indicator,
					{
						backgroundColor:
							"#009688" ||
							selectedPlan.color ||
							theme.reverse.fadeSecondary,
					},
				]}
			/>
			<Animated.View style={[isAlive, styles.title]}>
				<ScreenText variant="headlineMedium">
					{selectedPlan.title}
				</ScreenText>
			</Animated.View>
		</Animated.View>
	);
};

export default Handle;

const styles = StyleSheet.create({
	header: {
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
		paddingVertical: 14,
		paddingHorizontal,
	},
	title: {
		alignSelf: "flex-start",
		marginTop: 10,
	},
	indicator: {
		width: 30,
		height: 4,
		borderRadius: 20,
	},
});

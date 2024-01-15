import { StyleSheet, View, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
} from "react-native-reanimated";
// hook
import useTheme from "../../hook/useTheme";
// component
import ScreenText from "../ScreenText";
import { paddingHorizontal } from "../../styles/layout";

const Handle = ({
	selected,
	style,
	animatedIndex,
	// big button
	bigButtonOnPress,
	bigButtonTitle,
}) => {
	const theme = useTheme();
	const isAlive = useAnimatedStyle(() => ({
		height: interpolate(animatedIndex.value, [0, 1], [0, 50]),
		opacity: interpolate(animatedIndex.value, [0, 1], [0, 1]),
		transform: [
			{ translateX: interpolate(animatedIndex.value, [0, 1], [20, 0]) },
		],
	}));
	const bigButton = useAnimatedStyle(() => ({
		opacity: interpolate(+!!bigButtonTitle, [0, 1], [0, 1]),
		display: bigButtonTitle ? "flex" : "none",
	}));
	// render
	return (
		<Animated.View style={[styles.header]}>
			<Animated.View style={[bigButton, styles.buttonContainer(theme)]}>
				<TouchableOpacity onPress={bigButtonOnPress}>
					<ScreenText
						style={{
							textAlign: "center",
							paddingTop: 30,
							height: "100%",
						}}
						variant="titleLarge"
					>
						{bigButtonTitle}
					</ScreenText>
				</TouchableOpacity>
			</Animated.View>
			<View
				style={[
					styles.indicator,
					{
						backgroundColor:
							selected.color || theme.reverse.fadeSecondary,
					},
				]}
			/>
			{selected.title && (
				<Animated.View style={[isAlive, styles.title]}>
					<ScreenText variant="headlineSmall">
						{selected.title}
					</ScreenText>
				</Animated.View>
			)}
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
		// paddingHorizontal,
	},
	title: {
		alignSelf: "flex-start",
		marginTop: 10,
	},
	indicator: {
		width: 30,
		height: 4,
		borderRadius: paddingHorizontal,
	},
	buttonContainer: (theme) => ({
		width: "100%",
		height: 70,
		borderTopEndRadius: 15,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderTopStartRadius: 15,
		borderBottomEndRadius: 100,
		borderBottomLeftRadius: 100,
		borderBottomRightRadius: 100,
		borderBottomStartRadius: 100,
		backgroundColor: theme.primary,
		position: "absolute",
		top: 0,
	}),
});

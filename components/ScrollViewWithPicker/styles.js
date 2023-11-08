import { StyleSheet } from "react-native";

export const MAGIC_NUM = 0.5522847498;
export const MIN_BUBBLE_HEIGHT = 250;
export const MAX_BUBBLE_SHIFT = 50;
export const indicatorHeight = 5;
export const minHeight = 20;

export default StyleSheet.create({
	bobbleSVG: {
		zIndex: -1,
		position: "absolute",
		top: 0,
		left: 0,
	},
	indicator: (height) => ({
		width: "100%",
		minHeight,
		height,
		backgroundColor: "transparent",
		alignItems: "center",
		// backgroundColor: "red",
		position: "absolute",
		left: 0,
		top: 0,
		opacity: 0.5,
	}),
	indicatorLine: {
		height: indicatorHeight,
		width: 50,
		backgroundColor: "white",
		borderRadius: 50,
	},
});

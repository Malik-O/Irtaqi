import { StyleSheet, Dimensions } from "react-native";
import { paddingHorizontal } from "../../styles/layout";

export const MAGIC_NUM = 0.5522847498;
export const MIN_BUBBLE_HEIGHT = 150;
export const MAX_BUBBLE_SHIFT = 50;
export const stateZeroPaddingBottom = 25;
export const indicatorHeight = 5;
export const minHeight = 20;
export const navigateHight = 150;

const height = Dimensions.get("window").height;

export default StyleSheet.create({
	bobbleSVG: (zero) => ({
		width: "100%",
		height,
		pointerEvents: "none",
		zIndex: -1,
		position: "absolute",
		top: -zero,
		left: 0,
	}),
	indicator: (height) => ({
		width: "100%",
		minHeight,
		height,
		backgroundColor: "transparent",
		alignItems: "center",
		// backgroundColor: "red",
		opacity: 0.5,
		position: "absolute",
		top: 0,
		left: 0,
	}),
	indicatorLine: {
		height: indicatorHeight,
		width: 50,
		backgroundColor: "white",
		borderRadius: 50,
	},
	// header
	scrollHeader: (zero) => ({
		width: "100%",
		zIndex: 10,
		position: "absolute",
		backgroundColor: "red",
		top: zero,
		left: 0,
	}),
	navigationHeader: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	navigationBackButton: {
		marginTop: 10,
		alignItems: "flex-start",
		paddingHorizontal,
		// backgroundColor: "red",
		flex: 1,
	},
});

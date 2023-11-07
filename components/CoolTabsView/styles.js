import { StyleSheet } from "react-native";

export const titlePaddingVertical = 20;
export const containerPaddingHorizontal = 20;
export default StyleSheet.create({
	headerContainer: {
		// height: 60,
		flexDirection: "row",
		justifyContent: "space-around",
		zIndex: 100,
	},
	blurView: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	headerButtons: {
		width: 50,
		height: "100%",
		flex: 2,
		paddingHorizontal: containerPaddingHorizontal,
		justifyContent: "center",
		// backgroundColor: "red",
	},
});

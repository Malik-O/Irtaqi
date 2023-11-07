import { StyleSheet } from "react-native";

export const titlePaddingVertical = 20;
export const containerPaddingHorizontal = 20;
export default StyleSheet.create({
	headerContainer: {
		paddingTop: titlePaddingVertical,
		flexDirection: "row",
		justifyContent: "space-around",
		position: "absolute",
		zIndex: 100,
	},
	blurView: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: -1,
	},
	headerButtons: {
		height: "100%",
		flex: 2,
		paddingHorizontal: containerPaddingHorizontal,
		justifyContent: "center",
	},
});

import { Platform, StyleSheet } from "react-native";

export const titlePaddingVertical = 20;
export const containerPaddingHorizontal = 20;
export const iconSize = 30;

const headerContainer = {
	flexDirection: "row",
	justifyContent: "space-around",
	zIndex: 100,
};
export default StyleSheet.create({
	...Platform.select({
		ios: { headerContainer: { ...headerContainer } },
		android: {
			headerContainer: { ...headerContainer, position: "absolute" },
		},
	}),
	blurView: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	headerButtons: {
		// width: 50,
		height: "100%",
		flex: 2,
		paddingHorizontal: containerPaddingHorizontal,
		// justifyContent: "center",
		// alignContent: "center",
		// backgroundColor: "red",
	},
});

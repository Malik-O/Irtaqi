import { StyleSheet } from "react-native";

export const paddingHorizontal = 20;
export const tabBarBubbleShift = 50;
export const tabBarHeight = 300;
export const MAGIC_NUM = 0.5522847498;

export default StyleSheet.create({
	screenView: (theme) => ({
		flex: 1,
		// paddingHorizontal: 20,
		backgroundColor: theme === "light" ? "#dedede" : "#101D24",
	}),
	tabBarStyle: () => ({
		position: "absolute",
		// left: 10,
		// right: 10,
		bottom: 0,
		borderRadius: 30,
		// paddingTop: 40,
		overflow: "visible",
		// backgroundColor: "red",
		borderTopWidth: 0,
		// shadowOpacity: 0,
	}),
	barBackground: (theme) => ({
		backgroundColor: theme === "light" ? "#ffffff" : "#0D171C",
	}),
	text: (theme, reverse) => ({
		color: theme === "light" || reverse ? "black" : "white",
	}),
	tabBarActiveTintColor: "blue",
	navigationBackButton: {
		// width: 50,
		height: "100%",
		flex: 2,
		alignItems: "flex-start",
		// backgroundColor: "red",
		paddingHorizontal,
	},
	canvas: {
		width: "100%",
		height: tabBarHeight,
		position: "absolute",
		top: -tabBarBubbleShift,
	},
	planCardContainer: (backgroundColor) => ({
		margin: paddingHorizontal,
		backgroundColor,
		paddingHorizontal,
		paddingVertical: paddingHorizontal,
		borderRadius: 15,
	}),
});

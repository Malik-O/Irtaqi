import { StyleSheet } from "react-native";

export const paddingHorizontal = 20;
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
		bottom: 40,
		borderRadius: 30,
		// backgroundColor: "red",
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
		flex: 1,
		marginTop: 10,
		alignItems: "flex-start",
		paddingHorizontal,
	},
});

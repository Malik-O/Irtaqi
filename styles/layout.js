import { StyleSheet } from "react-native";

export default StyleSheet.create({
	screenView: (theme) => ({
		flex: 1,
		// paddingHorizontal: 20,
		backgroundColor: theme === "light" ? "#dedede" : "#101D24",
	}),
	tabBarStyle: () => ({
		position: "absolute",
		left: 10,
		right: 10,
		bottom: 20,
		borderRadius: 30,
		shadowOpacity: 0,
	}),
	barBackground: (theme) => ({
		backgroundColor: theme === "light" ? "#ffffff" : "#0D171C",
	}),
	text: (theme, reverse) => ({
		color: theme === "light" || reverse ? "black" : "white",
	}),
	tabBarActiveTintColor: "blue",
});

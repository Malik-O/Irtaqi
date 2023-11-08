import { StyleSheet } from "react-native";

// const sizes
export const dayButtonTextSize = 20;
export const dayButtonTextPaddingVertical = 15;
export const dayButtonTextInnerHight =
	dayButtonTextSize + dayButtonTextPaddingVertical * 2;

export const selectedBGColor = {
	light: "rgba(255, 255, 255, 0.5)",
	dark: "rgba(0, 0, 0, 0.2)",
};

export default StyleSheet.create({
	dayButton: (selected, colorScheme) => ({
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: dayButtonTextPaddingVertical,
		backgroundColor: selected ? selectedBGColor[colorScheme] : null,
		justifyContent: "center",
	}),
	dayButtonText: {
		width: dayButtonTextSize,
		height: dayButtonTextSize,
		textAlign: "center",
	},
	calendarRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

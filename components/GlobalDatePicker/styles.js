import { StyleSheet } from "react-native";

// const sizes
export const dayButtonTextSize = 20;
export const dayButtonTextPaddingVertical = 10;
export const dayButtonTextInnerHight =
	dayButtonTextSize + dayButtonTextPaddingVertical * 2 + 10;

export const selectedBGColor = {
	light: "rgba(0, 0, 0, 0.2)",
	dark: "rgba(255, 255, 255, 0.2)",
};

export default StyleSheet.create({
	dayButton: ({ isThisMonth, isToday, isSelected, colorScheme, color }) => ({
		borderColor: color,
		borderWidth: isToday ? 1 : 0,
		marginBottom: 10,
		transform: [{ scale: 0.9 }],
		borderRadius: dayButtonTextSize,
		paddingHorizontal: 10,
		paddingVertical: dayButtonTextPaddingVertical,
		backgroundColor: isSelected ? selectedBGColor[colorScheme] : null,
		opacity: isThisMonth ? 1 : 0.4,
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
	// date head
	dateHeadContainer: {
		// flexDirection: "row",
		// alignItems: "flex-end",
		marginBottom: dayButtonTextPaddingVertical,
	},
	subtitleDate: {
		opacity: 0.6,
		// marginHorizontal: 10
	},
});

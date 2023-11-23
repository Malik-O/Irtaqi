import { StyleSheet } from "react-native";

export const _buttonSize = 40;
export default StyleSheet.create({
	cardContainer: {
		margin: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	// info
	halfContainer: {
		flexDirection: "row",
		alignItems: "center",
		columnGap: 15,
	},
	// buttons
	attendanceButton: (active) => ({
		width: _buttonSize,
		height: _buttonSize,
		borderRadius: _buttonSize,
		borderWidth: +active,
		justifyContent: "center",
		alignItems: "center",
	}),
});

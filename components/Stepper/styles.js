import { StyleSheet, Dimensions } from "react-native";
import { paddingHorizontal } from "../../styles/layout";

const { height } = Dimensions.get("screen");

export const buttonsSize = 60;

export default StyleSheet.create({
	buttonsContainer: {
		width: "100%",
		// backgroundColor: "red",
		alignItems: "stretch",
		justifyContent: "space-between",
		// gap: 10,
		flexDirection: "row",
		position: "absolute",
		top: (height * 2) / 3,
		paddingHorizontal,
	},
	actionButton: (color) => ({
		fontSize: buttonsSize / 2,
		textAlign: "center",
		marginTop: buttonsSize / 4,
		color,
	}),
	// dashes
	dashesContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		gap: 10,
		paddingHorizontal,
	},
	dashBG: (rgb) => ({
		height: 3,
		flexGrow: 1,
		backgroundColor: `rgba(${rgb}, 0.4)`,
		borderRadius: 10,
		overflow: "hidden",
	}),
	dashOverlay: (rgb) => ({
		width: "100%",
		height: "100%",
		borderRadius: 10,
		backgroundColor: `rgba(${rgb}, 1)`,
		transformOrigin: "top right",
		position: "absolute",
		top: 0,
	}),
});

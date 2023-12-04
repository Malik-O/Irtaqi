const theme = {
	light: {
		primary: "#88B9F2",
		secondary: "#ffffff",
		tertiary: "#dedede",
		cardColor: "#ffffff",
		error: "#AB4F4F",
		success: "#4FAB52",
		warning: "#ACC83E",
	},
	dark: {
		primary: "#207EAC",
		secondary: "#0D171C",
		tertiary: "#101D24",
		cardColor: "#1f2c34",
		error: "#D66363",
		success: "#4DCC52",
		warning: "#BCDD37",
	},
};
export default {
	light: {
		...theme.light,
		attendanceCardColors: [theme.light.secondary, "#4FAB52", "#AB4F4F"],
	},
	dark: {
		...theme.dark,
		attendanceCardColors: [theme.dark.secondary, "#4FAB52", "#AB4F4F"],
	},
};

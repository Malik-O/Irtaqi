const theme = {
	light: {
		primary: "#88B9F2",
		secondary: "#ffffff",
		tertiary: "#dedede",
		cardColor: "#ffffff",
	},
	dark: {
		primary: "#88B9F2",
		secondary: "#0D171C",
		tertiary: "#101D24",
		cardColor: "#1f2c34",
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

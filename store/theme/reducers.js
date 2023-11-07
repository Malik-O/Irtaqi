import * as SecureStore from "expo-secure-store";

export default {
	changeIsDark(state, action) {
		state.isDark = action.payload;
	},
};

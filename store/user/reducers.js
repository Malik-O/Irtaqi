import * as SecureStore from "expo-secure-store";

export default {
	setUserDataState(state, action) {
		state.userData = { ...state.userData, ...action.payload };
	},
	deleteUserDataState(state) {
		state.userData = null;
	},
	setState(state, action) {
		const [arg, val] = action.payload;
		state.loginFormData[arg] = val;
	},
};

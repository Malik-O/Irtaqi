export default {
	setState(state, action) {
		const [arg, val] = action.payload;
		state.formData[arg] = val;
	},
	resetFrom(state) {
		console.log("resetFromresetFromresetFromresetFrom");
		state.formData = {};
	},
};

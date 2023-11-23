export default {
	setState(state, action) {
		const [arg, val] = action.payload;
		state.formData[arg] = val;
	},
};

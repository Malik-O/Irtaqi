export default {
	setState(state, action, g) {
		const [arg, val] = action.payload;
		state[arg] = val;
	},
};

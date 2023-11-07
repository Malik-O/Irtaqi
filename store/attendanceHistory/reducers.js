export default {
	initGroupsState(state, action) {
		state.groups = action.payload;
	},
	deleteAllGroupsState(state) {
		state.groups = null;
	},
};

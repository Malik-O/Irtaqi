export default {
	set(state, action) {
		state.globalDate = action.payload;
	},
	setSelectedMonth(state, action) {
		state.selectedMonth = action.payload;
	},
};

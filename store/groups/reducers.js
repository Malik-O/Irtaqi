export default {
	initGroupsState(state, action) {
		state.groups = action.payload;
	},
	deleteAllGroupsState(state) {
		state.groups = null;
	},
	// Attendance History
	addAttendancesHistories(state, action) {
		state.attendanceHistory = [
			...state.attendanceHistory,
			...action.payload,
		];
	},
};

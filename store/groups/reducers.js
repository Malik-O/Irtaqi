import sameHistoryCondition from "../../utils/sameHistoryCondition";

export default {
	setState(state, action) {
		const [arg, val] = action.payload;
		state.addGroupFormData[arg] = val;
	},
	initGroupsState(state, action) {
		state.groups = action.payload;
	},
	deleteAllGroupsState(state) {
		state.groups = null;
	},
	// Attendance History
	addAttendancesHistories(state, action) {
		let actionPayload = [...action.payload];
		// loop throw local store if exists then update else add
		state.attendanceHistory.forEach((att_h, att_hi) => {
			actionPayload = actionPayload.filter((new_history, ni) => {
				if (!sameHistoryCondition(new_history, att_h)) return true;
				state.attendanceHistory.splice(att_hi, 1, {
					...state.attendanceHistory[att_hi],
					...actionPayload[ni],
				});
				// actionPayload.splice(ni, 1);
			});
		});
		// add the remaining
		state.attendanceHistory = [
			...state.attendanceHistory,
			...actionPayload,
		];
	},
};

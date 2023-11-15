import { groupsActions } from "../../store/groups";

export default function (dispatch, data) {
	dispatch(groupsActions.addAttendancesHistories(data));
}

// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import { groupsActions } from "../../store/groups";
// utils
import addToAttendanceStore from "./addToAttendanceStore";
import extractISODate from "../../utils/extractISODate";
// hooks
import usePush from "../notifications/usePush";

export default function () {
	const pushNotification = usePush();
	const dispatch = useDispatch();
	const { globalDate } = useSelector((state) => state.globalDate);
	// mutation
	const UpdateAttendance = graphQl.mutations.UpdateAttendance;
	const [UpdateAttendanceMutation, { data, loading, error }] =
		useMutation(UpdateAttendance);

	return async (variables) => {
		variables = {
			...variables,
			date: extractISODate({ date: globalDate }),
		};
		// console.log('variables:', variables)
		// add locally (optimist)
		addToAttendanceStore(dispatch, [variables]);
		// mutate the database
		try {
			let returnData = await UpdateAttendanceMutation({ variables });
			returnData = { ...variables, ...returnData.data.updateAttendance };
			// locally
			addToAttendanceStore(dispatch, [returnData]);
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
			});
		}
	};
}

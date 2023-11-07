// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import { groupsActions } from "../store/groups";

export default function () {
	const dispatch = useDispatch();
	// mutation
	const UpdateAttendance = graphQl.mutations.UpdateAttendance;
	const [UpdateAttendanceMutation, { data, loading, error }] =
		useMutation(UpdateAttendance);

	return async (variables) => {
		// console.log("variables:", variables);
		// add locally
		// dispatch(groupsActions.addAttendancesHistories(variables));
		// mutate the database
		try {
			await UpdateAttendanceMutation({ variables });
		} catch (e) {
			console.log("e:", e);
		}
	};
}

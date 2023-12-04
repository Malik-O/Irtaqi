// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import { plansActions } from "../../store/plans";
// hooks
import usePush from "../notifications/usePush";

export default function () {
	const pushNotification = usePush();
	const dispatch = useDispatch();
	// mutation
	const UpdateHistory = graphQl.mutations.UpdateHistory;
	const [updateHistoryMutation, { data, loading, error }] =
		useMutation(UpdateHistory);

	return async (variables) => {
		console.log("variables:", variables);
		// add locally
		dispatch(plansActions.addInstancesHistory(variables));
		// mutate the database
		try {
			const {
				data: { updateHistory },
			} = await updateHistoryMutation({ variables });
			dispatch(
				plansActions.addInstancesHistory({
					...variables,
					...updateHistory,
				}),
			);
			// console.log("updateHistory:", updateHistory, variables);
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
			});
		}
	};
}

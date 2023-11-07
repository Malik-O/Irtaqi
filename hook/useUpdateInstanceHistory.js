// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import { plansActions } from "../store/plans";

export default function () {
	const dispatch = useDispatch();
	// mutation
	const UpdateHistory = graphQl.mutations.UpdateHistory;
	const [updateHistoryMutation, { data, loading, error }] =
		useMutation(UpdateHistory);

	return async (variables) => {
		// console.log("variables:", variables);
		// add locally
		dispatch(plansActions.addInstancesHistory(variables));
		// mutate the database
		try {
			await updateHistoryMutation({ variables });
		} catch (e) {
			console.log("e:", e);
		}
	};
}

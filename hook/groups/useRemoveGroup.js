import { useState } from "react";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// hooks
import useGroups from "./useGroups";
import usePush from "../notifications/usePush";

export default function (refetchGroups) {
	const [loading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	// mutation
	const RemoveGroup = graphQl.mutations.RemoveGroup;
	const [RemoveGroupMutation] = useMutation(RemoveGroup);
	// mutation action
	async function mutationAction(id) {
		let variables = { id };
		console.log("variables:", variables);
		// mutate the database
		setIsLoading(true);
		try {
			const { data } = await RemoveGroupMutation({ variables });
			console.log("data:", data);
			await refetchGroups();
			pushNotification({
				type: "success",
				message: "removeGroupeSuccessfully",
				data: [data.removeGroup.title],
			});
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
				floatingNotification: true,
			});
		}
		setIsLoading(false);
	}
	return { mutationAction, loading };
}

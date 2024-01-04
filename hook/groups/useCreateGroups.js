import { useState } from "react";
import { useRouter } from "expo-router";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// hooks
import useGroups from "../groups/useGroups";
import usePush from "../notifications/usePush";
//
import fullName from "../../utils/fullName";
// redux
import { useSelector, useDispatch } from "react-redux";

export default function (sheetRef) {
	const [loading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	const { refetchGroups } = useGroups();
	// redux
	const dispatch = useDispatch();
	const { addGroupFormData } = useSelector((state) => state.groups);
	// mutation
	const CreateGroup = graphQl.mutations.CreateGroup;
	const [CreateGroupMutation] = useMutation(CreateGroup);
	// mutation action
	async function mutationAction(variables) {
		variables = {
			centerID: "650551e91bac85c6cc903431",
			title: addGroupFormData.title,
			description: addGroupFormData.description,
		};
		console.log("variables:", variables);
		// mutate the database
		setIsLoading(true);
		try {
			const { data } = await CreateGroupMutation({ variables });
			console.log("data:", data);
			await refetchGroups();
			pushNotification({
				type: "success",
				message: "createGroupeSuccessfully",
				data: [variables.title],
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
		// go back
		sheetRef.current.close();
	}
	return { mutationAction, loading };
}

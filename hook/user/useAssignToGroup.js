import { useState } from "react";
import { useRouter } from "expo-router";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// hooks
import useGroups from "../groups/useGroups";
import usePush from "../notifications/usePush";
// utils
import fullName from "../../utils/fullName";
// redux
import { useSelector, useDispatch } from "react-redux";

export default function () {
	const [loading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	// redux
	const { refetchGroups } = useGroups();
	// mutation
	const AssignToGroup = graphQl.mutations.AssignToGroup;
	const [AssignToGroupMutation] = useMutation(AssignToGroup);
	// mutation action
	async function mutationAction(user, group, sheetRef) {
		const variables = { userID: user.id, groupID: group.id };
		console.log("0:", user);
		setIsLoading(true);
		try {
			console.log("variables:", variables);
			await AssignToGroupMutation({ variables });
			await refetchGroups();
			pushNotification({
				type: "success",
				message: "assignUserToGroupSuccessfully",
				data: [fullName(user), group.title],
			});
			// go back
			sheetRef?.current && sheetRef.current.close();
		} catch (err) {
			console.log("err:", err);
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

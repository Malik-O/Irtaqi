import { useEffect, useState } from "react";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import useGroups from "../groups/useGroups";
// utils
import fullName from "../../utils/fullName";
// hooks
import usePush from "../notifications/usePush";

export default function (bottomSheetRef) {
	let [isLoading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	const { refetchGroups } = useGroups();
	// mutation
	const RemoveUser = graphQl.mutations.RemoveUser;
	const [RemoveUserMutation] = useMutation(RemoveUser);
	// remove function
	async function removeUser(user) {
		setIsLoading(true);
		try {
			const variables = { UserID: user.id };
			const {
				data: { removeUser },
			} = await RemoveUserMutation({ variables });
			// refresh groups list
			await refetchGroups();
			// close bottom sheet
			bottomSheetRef?.current && bottomSheetRef.current.close();
			//
			pushNotification({
				type: "success",
				message: "removeUserSuccessfully",
				data: [fullName(removeUser)],
			});
		} catch (e) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
				floatingNotification: true,
			});
		}
		// setIsDeleted(true);
		setIsLoading(false);
	}
	return { removeUser, isLoading };
}

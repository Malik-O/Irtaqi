import { useEffect, useState } from "react";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import useGroups from "../groups/useGroups";
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
	async function removeUser(UserID) {
		setIsLoading(true);
		try {
			const variables = { UserID };
			const {
				data: { removeUser },
			} = await RemoveUserMutation({ variables });
			// refresh groups list
			await refetchGroups();
			// close bottom sheet
			bottomSheetRef.current.close();
			//
			pushNotification({
				type: "success",
				message: "removeUserSuccessfully",
				data: ["000000"],
			});
		} catch (e) {
			console.log("e:", e);
		}
		// setIsDeleted(true);
		setIsLoading(false);
	}
	return { removeUser, isLoading };
}

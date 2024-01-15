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

export default function (selectedUser, sheetRef) {
	// const [loading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	// redux
	const { refetchGroups } = useGroups();
	// mutation
	const UpdateUser = graphQl.mutations.UpdateUser;
	const [UpdateUserMutation] = useMutation(UpdateUser);
	// mutation action
	async function mutationAction(variables) {
		// go back
		sheetRef.current.close();
		console.log("selectedUser:", selectedUser);
		// mutate the database
		variables = {
			userID: selectedUser.id,
			email: selectedUser.email,
			phone: selectedUser.phone,
			parentPhone: selectedUser.parentPhone,
		};
		// setIsLoading(true);
		try {
			const { data } = await UpdateUserMutation({ variables });
			console.log("data:", data);
			await refetchGroups();
			pushNotification({
				type: "success",
				message: "UpdatedUserSuccessfully",
				data: [fullName(data.updateUser)],
			});
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
				floatingNotification: true,
			});
		}
		// setIsLoading(false);
	}
	return { mutationAction };
}

import { useState } from "react";
import { useRouter } from "expo-router";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../graphQl";
// hooks
import useGroups from "./useGroups";
import usePush from "./notifications/usePush";
// redux
import { useSelector, useDispatch } from "react-redux";

export default function () {
	const router = useRouter();
	const [loading, setIsLoading] = useState(false);
	const pushNotification = usePush();
	// redux
	const dispatch = useDispatch();
	const { refetchGroups } = useGroups();
	const { formData } = useSelector((state) => state.addUser);
	// mutation
	const CreateUser = graphQl.mutations.CreateUser;
	const [CreateUserMutation] = useMutation(CreateUser);
	// mutation action
	async function mutationAction(variables) {
		variables = {
			// name
			first_name: formData.first_name,
			parent_name: formData.parent_name,
			rest_of_name: formData.rest_of_name,
			// id
			gender: formData.gender,
			dateOfBirth: formData.dateOfBirth,
			nationalID: formData.nationalID,
			// connection
			email: formData.email,
			phone: formData.phone,
			parentPhone: formData.parentPhone,
			// roles
			roleTitle: "student",
			resourceIds: formData.selectedGroups,
		};
		// mutate the database
		setIsLoading(true);
		try {
			await CreateUserMutation({ variables });
			await refetchGroups();
			pushNotification({
				type: "success",
				message: "createUserSuccessfully",
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
		router.back();
	}
	return { mutationAction, loading };
}

import { useRouter } from "expo-router";
// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";

export default function () {
	const router = useRouter();
	const dispatch = useDispatch();
	const { formData } = useSelector((state) => state.addUser);
	// mutation
	const CreateUser = graphQl.mutations.CreateUser;
	const [CreateUserMutation, { data, loading, error }] =
		useMutation(CreateUser);
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
		};
		console.log("variables:", variables);
		// add locally (optimist)
		// addToAttendanceStore(dispatch, [variables]);
		// mutate the database
		try {
			let returnData = await CreateUserMutation({ variables });
			// returnData = { ...variables, ...returnData.data };
			// console.log("returnData:", returnData)/;
			// locally
			// addToAttendanceStore(dispatch, [returnData]);
		} catch (e) {
			console.log("e:", e);
		}
		//
		router.back();
	}
	return { mutationAction, loading };
}

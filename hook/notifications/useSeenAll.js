// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector } from "react-redux";
// hooks
import connectToNotificationStore from "../useConnectToStore/instants/connectToNotificationStore";

export default function () {
	const StoreConnectionsInstance = connectToNotificationStore();
	const { userData } = useSelector((state) => state.user);
	const { notifications } = useSelector((state) => state.notifications);
	// mutation
	const SeenAllNotifications = graphQl.mutations.SeenAllNotifications;
	const [SeenAllNotificationsMutation, { data, loading, error }] =
		useMutation(SeenAllNotifications);

	return async () => {
		// variables
		const variables = { userID: userData?.id };
		// mutate the database
		try {
			await SeenAllNotificationsMutation({ variables });
			// locally
			StoreConnectionsInstance.add(
				notifications.map((notification) => ({
					...notification,
					seen: true,
				})),
			);
		} catch (e) {
			console.log("e:", e);
		}
	};
}

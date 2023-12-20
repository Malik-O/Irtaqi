// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector } from "react-redux";
// hooks
import connectToNotificationStore from "../useConnectToStore/instants/connectToNotificationStore";
import usePush from "../notifications/usePush";

export default function () {
	const StoreConnectionsInstance = connectToNotificationStore();
	const { userData } = useSelector((state) => state.user);
	const { notifications } = useSelector((state) => state.notifications);
	const pushNotification = usePush();
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
		} catch (err) {
			pushNotification({
				type: "error",
				message: "MutationError",
				error: JSON.stringify(err),
				floatingNotification: true,
			});
		}
	};
}

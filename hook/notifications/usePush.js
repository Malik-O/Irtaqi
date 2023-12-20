// graphQL
import { useMutation } from "@apollo/client";
import graphQl from "../../graphQl";
// redux
import { useSelector, useDispatch } from "react-redux";
import { notificationsActions } from "../../store/notifications";
// hooks
import connectToNotificationStore from "../useConnectToStore/instants/connectToNotificationStore";

export default function () {
	const StoreConnectionsInstance = connectToNotificationStore();
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.user);
	// mutation
	const PushNotification = graphQl.mutations.PushNotification;
	const [PushNotificationMutation, { data, loading, error }] =
		useMutation(PushNotification);
	return async (variables) => {
		try {
			variables = { ...variables, userID: userData?.id };
			// fire snackbar
			dispatch(notificationsActions.setSnackbarVisible(true));
			dispatch(notificationsActions.setSnackbarData(variables));
			// save the notification in DB
			if (variables.floatingNotification || !userData?.id) return;
			const {
				data: { pushNotification },
			} = await PushNotificationMutation({ variables });
			// add to store locally
			StoreConnectionsInstance.init([pushNotification]);
		} catch (e) {
			console.log("e:", e);
		}
	};
}

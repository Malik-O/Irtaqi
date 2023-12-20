import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { notificationsActions } from "../../store/notifications";
// hooks
import connectToNotificationStore from "../useConnectToStore/instants/connectToNotificationStore";
import usePush from "../notifications/usePush";
// graphQL
import { useLazyQuery, useSubscription } from "@apollo/client";
import graphQl from "../../graphQl";

export default function () {
	const [isLoading, setIsLoading] = useState(false);
	const StoreConnectionsInstance = connectToNotificationStore();
	const pushNotification = usePush();
	// StoreConnectionsInstance.get();
	// redux states
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.user);
	const { notifications } = useSelector((state) => state.notifications);
	// graphQL
	const GetNotifications = graphQl.queries.GetNotifications;
	const [
		getGetNotifications,
		{ loading, error: graphQlError, data: graphQlData, refetch },
	] = useLazyQuery(GetNotifications);
	// variables
	const variables = { userID: userData?.id };
	// first fetch
	useEffect(() => {
		if (userData?.id) {
			setIsLoading(true);
			getGetNotifications({ variables })
				.then(({ data }) => {
					setIsLoading(false);
					StoreConnectionsInstance.init(data?.notifications);
				})
				.catch((err) => {
					setIsLoading(false);
					pushNotification({
						type: "error",
						message: "QueryError",
						error: JSON.stringify(err),
						floatingNotification: true,
					});
				});
		}
	}, [userData]);
	// refetch data
	async function refetchGroupAttendance() {
		setIsLoading(true);
		const { data } = await refetch(variables);
		StoreConnectionsInstance.init(data?.notifications);
		setIsLoading(false);
	}

	return { isLoading, refetchGroupAttendance };
}

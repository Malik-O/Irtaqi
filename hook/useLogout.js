import { useRouter } from "expo-router";
// hook
import connectToUserStore from "./useConnectToStore/instants/connectToUserStore";
import connectToGroupsStore from "./useConnectToStore/instants/connectToGroupsStore";
import connectToNotificationStore from "./useConnectToStore/instants/connectToNotificationStore";
import connectToPlansStore from "./useConnectToStore/instants/connectToPlansStore";

export default function () {
	const router = useRouter();
	const UserConnectionsInstance = connectToUserStore();
	const GroupsConnectionsInstance = connectToGroupsStore();
	const NotificationConnectionsInstance = connectToNotificationStore();
	const PlansConnectionsInstance = connectToPlansStore();
	return () => {
		UserConnectionsInstance.delete();
		GroupsConnectionsInstance.delete();
		NotificationConnectionsInstance.delete();
		PlansConnectionsInstance.delete();
		// go to login page
		router.replace("/login");
	};
}

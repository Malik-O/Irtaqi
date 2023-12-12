import { useRouter } from "expo-router";
// hook
import connectToUserStore from "./useConnectToStore/instants/connectToUserStore";

export default function () {
	const router = useRouter();
	const UserConnectionsInstance = connectToUserStore();
	return () => {
		UserConnectionsInstance.delete();
		router.replace("/login");
	};
}

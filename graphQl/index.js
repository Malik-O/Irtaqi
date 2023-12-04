import { gql } from "@apollo/client";
//* Queries
import GetUserById from "./queries/GetUserById";
import GetUserGroups from "./queries/GetUserGroups";
import GetPlans from "./queries/GetPlans";
import GetPlanInstanceHistoryAtDate from "./queries/GetPlanInstanceHistoryAtDate";
import groupAttendance from "./queries/groupAttendance";
import GetNotifications from "./queries/GetNotifications";
//* Mutations
import CreateUser from "./mutations/CreateUser";
import AddPlan from "./mutations/AddPlan";
import UpdateHistory from "./mutations/UpdateHistory";
import UpdateAttendance from "./mutations/UpdateAttendance";
// notifications
import SeenAllNotifications from "./mutations/SeenAllNotifications";
import PushNotification from "./mutations/PushNotification";

export default {
	queries: {
		GetUserById,
		GetNotifications,
		GetUserGroups,
		GetPlans,
		GetPlanInstanceHistoryAtDate,
		groupAttendance,
	},
	mutations: {
		CreateUser,
		AddPlan,
		UpdateHistory,
		UpdateAttendance,
		// notifications
		SeenAllNotifications,
		PushNotification,
	},
	subscriptions: {
		NewNotification: gql`
			subscription Subscription {
				newNotificationSubscription {
					createdAt
					icon
					id
					message
					seen
					type
					userID
				}
			}
		`,
	},
};

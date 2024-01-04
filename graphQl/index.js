import { gql } from "@apollo/client";
//* Queries
import GetUserById from "./queries/GetUserById";
import GetUserGroups from "./queries/GetUserGroups";
import GetPlans from "./queries/GetPlans";
import GetPlanInstanceHistoryAtDate from "./queries/GetPlanInstanceHistoryAtDate";
import groupAttendance from "./queries/groupAttendance";
import GetNotifications from "./queries/GetNotifications";
//* Mutations
import AddPlan from "./mutations/AddPlan";
import UpdateHistory from "./mutations/UpdateHistory";
import UpdateAttendance from "./mutations/UpdateAttendance";
import CreateGroup from "./mutations/CreateGroup";
// user
import CreateUser from "./mutations/user/CreateUser";
import RemoveUser from "./mutations/user/RemoveUser";
// notifications
import SeenAllNotifications from "./mutations/notification/SeenAllNotifications";
import PushNotification from "./mutations/notification/PushNotification";

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
		CreateGroup,
		CreateUser,
		AddPlan,
		UpdateHistory,
		UpdateAttendance,
		// notifications
		SeenAllNotifications,
		PushNotification,
		// user
		RemoveUser,
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

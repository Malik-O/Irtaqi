import { gql } from "@apollo/client";
//* Queries
import GetUserById from "./queries/GetUserById";
import GetUserGroups from "./queries/GetUserGroups";
import GetPlans from "./queries/GetPlans";
import GetPlanInstanceHistoryAtDate from "./queries/GetPlanInstanceHistoryAtDate";
import groupAttendance from "./queries/groupAttendance";
import GetNotifications from "./queries/GetNotifications";
import IsNationalIDExists from "./queries/IsNationalIDExists";
//* Mutations
import AddPlan from "./mutations/AddPlan";
import UpdateHistory from "./mutations/UpdateHistory";
import UpdateAttendance from "./mutations/UpdateAttendance";
import CreateGroup from "./mutations/CreateGroup";
import RemoveGroup from "./mutations/RemoveGroup";
// user
import CreateUser from "./mutations/user/CreateUser";
import RemoveUser from "./mutations/user/RemoveUser";
import UpdateUser from "./mutations/user/UpdateUser";
import AssignToGroup from "./mutations/user/AssignToGroup";
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
		IsNationalIDExists,
	},
	mutations: {
		// groups
		CreateGroup,
		RemoveGroup,
		// user
		CreateUser,
		RemoveUser,
		UpdateUser,
		AssignToGroup,
		// plans
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

//* Queries
import GetUserById from "./queries/GetUserById";
import GetUserGroups from "./queries/GetUserGroups";
import GetPlans from "./queries/GetPlans";
import GetPlanInstanceHistoryAtDate from "./queries/GetPlanInstanceHistoryAtDate";
import groupAttendance from "./queries/groupAttendance";
//* Mutations
import AddPlan from "./mutations/AddPlan";
import UpdateHistory from "./mutations/UpdateHistory";
import UpdateAttendance from "./mutations/UpdateAttendance";

export default {
	queries: {
		GetUserById,
		GetUserGroups,
		GetPlans,
		GetPlanInstanceHistoryAtDate,
		groupAttendance,
	},
	mutations: { AddPlan, UpdateHistory, UpdateAttendance },
};

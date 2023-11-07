import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { groupsActions } from "../store/groups";
// graphQL
import { useLazyQuery } from "@apollo/client";
import graphQl from "../graphQl";
// utils
import extractISODate from "../utils/extractISODate";

export default function (planInstance) {
	// redux states
	// const { instancesHistory } = useSelector((state) => state.plans);
	const { groupID } = useLocalSearchParams();
	const { globalDate } = useSelector((state) => state.globalDate);
	const { attendanceHistory } = useSelector((state) => state.groups);
	// graphQL
	const dispatch = useDispatch();
	const GroupAttendance = graphQl.queries.groupAttendance;
	const [
		getGroupAttendance,
		{ loading, error: graphQlError, data: graphQlData },
	] = useLazyQuery(GroupAttendance);
	// prepare vars
	const variables = {
		groupID,
		// date: "2023-10-30T22:00:00.000+00:00",
		// date: globalDate.getTime() + "",
		date: new Date(extractISODate({ date: globalDate })),
	};
	console.log("variables:", { variables, globalDate });
	useEffect(() => {
		getGroupAttendance({ variables })
			.then(({ data: { groupAttendance } }) => {
				console.log("GroupAttendance:", groupAttendance);
				dispatch(
					groupsActions.addAttendancesHistories(groupAttendance),
				);
			})
			.catch((err) => console.log({ err }));
	}, [globalDate]);
	return loading;
}

import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
// graphQL
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useLazyQuery } from "@apollo/client";
import graphQl from "../../graphQl";
// utils
import extractISODate from "../../utils/extractISODate";
import addToAttendanceStore from "./addToAttendanceStore";

export default function () {
	loadDevMessages();
	loadErrorMessages();
	const [isLoading, setIsLoading] = useState(false);
	// redux states
	const dispatch = useDispatch();
	const { groupID } = useLocalSearchParams();
	const { globalDate } = useSelector((state) => state.globalDate);
	// graphQL
	const GroupAttendance = graphQl.queries.groupAttendance;
	const [
		getGroupAttendance,
		{ loading, error: graphQlError, data: graphQlData, refetch, ...d },
	] = useLazyQuery(GroupAttendance);
	// variables
	const variables = {
		groupID,
		date: new Date(extractISODate({ date: globalDate })),
	};
	// first fetch
	useEffect(() => {
		setIsLoading(true);
		// console.log("variables:", variables);
		getGroupAttendance({ variables })
			.then(({ data }) => {
				setIsLoading(false);
				addToAttendanceStore(dispatch, data.groupAttendance);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log("rrrrrrrr0", { err });
			});
	}, []);
	// refetch data
	const refetchGroupAttendance = async () => {
		setIsLoading(true);
		const { data } = await refetch(variables);
		console.log("refetchGroupAttendance:", { variables, data });
		addToAttendanceStore(dispatch, data.groupAttendance);
		setIsLoading(false);
	};
	// first fetch
	useEffect(() => {
		refetchGroupAttendance();
	}, [globalDate]);

	return { isLoading, refetchGroupAttendance };
}

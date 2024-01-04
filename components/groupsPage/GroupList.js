import { Text, ActivityIndicator } from "react-native";
// redux
import { useSelector } from "react-redux";
// hooks
import useGroups from "../../hook/groups/useGroups";
// components
import Card from "../Card";
// utils
import resolveRouter from "./utils/resolveRouter";

export default function () {
	// redux
	const { groups } = useSelector((state) => state.groups);
	// graphQL
	const { isLoading, error } = useGroups();
	// let isLoading, error;
	// elements
	if (isLoading) return <ActivityIndicator />;
	if (error) return <Text>{error}</Text>;
	return groups.map((group, i) => (
		<Card
			item={group}
			key={group.id}
			href={resolveRouter(group, { groups, groupID: group.id })}
		/>
	));
}

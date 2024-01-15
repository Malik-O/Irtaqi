import { Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
// redux
import { useSelector } from "react-redux";
// hooks
import useTranslate from "../../hook/useTranslate";
import useGroups from "../../hook/groups/useGroups";
import useRemoveGroup from "../../hook/groups/useRemoveGroup";
// components
import SwipeableList from "../SwipeableList";
// utils
import resolveRouter from "./utils/resolveRouter";

export default function () {
	const router = useRouter();
	const translate = useTranslate();
	// graphQL
	const { isLoading, error, refetchGroups } = useGroups();
	const { mutationAction, loading } = useRemoveGroup(refetchGroups);
	// redux
	const { groups } = useSelector((state) => state.groups);
	// elements
	if (isLoading) return <ActivityIndicator />;
	if (error) return <Text>{error}</Text>;
	//
	function onPress(item) {
		const href = resolveRouter(item, groups);
		router.push(href);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}
	// console.log("groups:", groups);
	return (
		<SwipeableList
			data={groups}
			onPress={onPress}
			onRefresh={refetchGroups}
			emptyMessage={[
				translate("noGroupsYetMessage"),
				translate("add_group"),
			]}
			hasConfirmation
			// remove
			removeActionMutation={mutationAction}
			loading={loading}
		/>
	);
	// return groups.map((group, i) => (
	// 	<Card
	// 		item={group}
	// 		key={group.id}
	// 		href={resolveRouter(group, { itemList:groups, itemID: group.id })}
	// 	/>
	// ));
}

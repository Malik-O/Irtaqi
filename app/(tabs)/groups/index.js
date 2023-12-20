import React from "react";
import { Text, ActivityIndicator } from "react-native";
import {
	useRouter,
	useLocalSearchParams,
	usePathname,
	useFocusEffect,
} from "expo-router";
// redux
import { useSelector } from "react-redux";
// capitalize
import capitalize from "../../../utils/capitalize";
// hooks
import useGroups from "../../../hook/useGroups";
import useTranslate from "../../../hook/useTranslate";
// components
import Card from "../../../components/Card";
import ScreenView from "../../../components/ScreenView";
import ScreenText from "../../../components/ScreenText";
//
import { paddingHorizontal } from "../../../styles/layout";

// resolvers
function resolveRouter({ id, as }, { groups, groupID }) {
	// console.log(id, as);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	let pathname;
	switch (as) {
		case "teacher":
			pathname = `/groups/[id]/asTeacher/${selectedGroup.courses[0].id}`;
			break;
		case "organization_owner":
		case "center_admin":
		case "group_admin":
			pathname = "/groups/[id]/asAdmin";
			break;
	}
	return {
		pathname,
		params: { id },
	};
}

function Content() {
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
			key={i}
			href={resolveRouter(group, { groups, groupID: group.id })}
		/>
	));
}

export default function () {
	const translate = useTranslate();
	const scrollViewProps = {
		title: translate("groups"),
		back: false,
		more: false,
	};
	return (
		<ScreenView>
			<ScreenText
				variant="displayMedium"
				style={{ paddingHorizontal, marginVertical: paddingHorizontal }}
			>
				{translate("groups", true)}
			</ScreenText>
			<Content />
		</ScreenView>
	);
}

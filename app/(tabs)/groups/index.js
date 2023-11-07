import React from "react";
import { Button, Text, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// redux
import { useSelector } from "react-redux";
// hooks
import useGroups from "../../../hook/useGroups";
import useTranslate from "../../../hook/useTranslate";
// components
import Card from "../../../components/Card";
import ScreenView from "../../../components/ScreenView";
import { ScrollView } from "react-native-gesture-handler";
import CoolScrollView from "../../../components/CoolScrollView";

// resolvers
function resolveRouter({ id }) {
	return {
		pathname: "/groups/[id]",
		params: { id },
	};
}

function Content() {
	// redux
	const { groups } = useSelector((state) => state.groups);
	// graphQL
	const { isLoading, error } = useGroups();
	// elements
	if (isLoading) return <ActivityIndicator />;
	if (error) return <Text>{error}</Text>;
	return (
		<ScrollView>
			{groups.map((group, i) => (
				<Card item={group} key={i} href={resolveRouter(group)} />
			))}
		</ScrollView>
	);
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
			<CoolScrollView props={scrollViewProps}>
				<Content />
			</CoolScrollView>
		</ScreenView>
	);
}

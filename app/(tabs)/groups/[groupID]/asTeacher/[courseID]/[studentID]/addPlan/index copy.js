import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Link,
	usePathname,
	useLocalSearchParams,
	useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
// hook
import connectToPlansStore from "../../../../../../../../hook/useConnectToStore/instants/connectToPlansStore";
// apollo
import graphQl from "../../../../../../../../graphQl";
import { useMutation } from "@apollo/client";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../../store/addPlan";
import { plansActions } from "../../../../../../../../store/plans";
// components
import ListItemRipple from "../../../../../../../../components/ListItemRipple";
import ScreenView from "../../../../../../../../components/ScreenView";
import SelectDialog from "../../../../../../../../components/SelectDialog";
import MultiSelectDialog from "../../../../../../../../components/MultiSelectDialog";
import DatePickerListItem from "../../../../../../../../components/DatePickerListItem";
// paper
import {
	TextInput,
	List,
	Button as PaperButton,
	Text,
	TouchableRipple,
	Divider,
	Card,
} from "react-native-paper";

async function doAddPlan({
	addPlanAction,
	variables,
	dispatch,
	router,
	PlanStoreConnectionsInstance,
}) {
	const { data } = await addPlanAction({ variables });
	console.log("data:", { ...variables, ...data, id: data.addPlan.id });
	PlanStoreConnectionsInstance.add([{ ...variables, ...data.addPlan }]);
	// dispatch(plansActions.addPlans([{ ...variables, id: data.addPlan.id }]));
	router.back();
}

export default function addPlan() {
	const router = useRouter();
	const pathname = usePathname();
	const { groupsID, courseID, studentID } = useLocalSearchParams();
	// connect with plan store
	const PlanStoreConnectionsInstance = connectToPlansStore();
	// mutation
	const AddPlan = graphQl.mutations.AddPlan;
	const [addPlanAction, { data, loading, error }] = useMutation(AddPlan);
	// type states
	const dispatch = useDispatch();
	const {
		selectedSurah,
		surahDialog,
		typeDialog,
		typeSelected,
		typeItems,
		fromAyah,
		amount,
		weeks,
		directions,
		selectedDirections,
		directionsDialog,
		selectedDays,
		daysDialog,
		startingAt,
	} = useSelector((state) => state.addPlan);
	const { pages, surahAdj, versesPerPage, surahNames } = useSelector(
		(state) => state.quran,
	);

	const setSelectedItem = (key, val) =>
		dispatch(addPlanActions.setState([key, val]));

	useEffect(() => {
		setSelectedItem("typeSelected", typeItems[0]);
		setSelectedItem("selectedSurah", surahNames[0]);
		setSelectedItem("selectedDirections", directions[0]);
	}, []);

	return (
		<ScreenView>
			<StatusBar style="light" />
			<Card style={{ margin: 20, padding: 0 }} mode="contained">
				<Card.Content style={{ padding: 0 }}>
					<DatePickerListItem
						title="starting at"
						storeAction={addPlanActions}
						datePickerState={[startingAt, "startingAt"]}
					/>
					<ListItemRipple
						title="From ayah"
						inputState={[fromAyah, "fromAyah"]}
						storeAction={addPlanActions}
					/>
					<ListItemRipple
						title="plan type"
						selectedItem={typeSelected}
						action={() => router.push(`${pathname}/planType`)}
					/>
					<ListItemRipple
						title="surah"
						selectedItem={selectedSurah}
						action={() => router.push(`${pathname}/surah`)}
					/>
					<ListItemRipple
						title="direction"
						selectedItem={selectedDirections}
						action={() => router.push(`${pathname}/direction`)}
					/>
					<Divider
						style={{ backgroundColor: "white", opacity: 0.5 }}
					/>
					<ListItemRipple
						title="From ayah"
						inputState={[fromAyah, "fromAyah"]}
						storeAction={addPlanActions}
					/>
					<ListItemRipple
						title="Pages per day"
						inputState={[amount, "amount"]}
						storeAction={addPlanActions}
					/>
					<ListItemRipple
						title="Weeks"
						inputState={[weeks, "weeks"]}
						storeAction={addPlanActions}
					/>
					<ListItemRipple
						title="working days"
						selectedItem={selectedDays}
						action={() => router.push(`${pathname}/workingDays`)}
					/>
				</Card.Content>
			</Card>
			{/* mutation add plan */}
			<PaperButton
				onPress={() => {
					const variables = {
						from: surahNames.indexOf(selectedSurah) + 1,
						amount: +amount,
						weeks: +weeks,
						entityId: studentID,
						entityType: "student",
						title: typeSelected,
						workingDays: selectedDays,
						orderReversed: directions === "progressive",
						startingAt: startingAt.getTime() + "",
					};
					doAddPlan({
						addPlanAction,
						dispatch,
						router,
						variables,
						PlanStoreConnectionsInstance,
					});
				}}
			>
				Add Plan
			</PaperButton>
		</ScreenView>
	);
}

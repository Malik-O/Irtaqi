import { useCallback, useEffect, useMemo } from "react";
import {
	View,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	useColorScheme,
} from "react-native";
import { usePathname, Link, useLocalSearchParams } from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import { Button as PaperButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenView from "../../../../../../components/ScreenView";
import ScreenText from "../../../../../../components/ScreenText";
import PlanCard from "../../../../../../components/plans/PlanCard";
import AdvancedCard from "../../../../../../components/plans/AdvancedCard";
import GlobalDatePicker from "../../../../../../components/GlobalDatePicker";
// hooks
import usePlans from "../../../../../../hook/usePlans";
import useWhichInstanceIsToday from "../../../../../../hook/useWhichInstanceIsToday";
import useTranslate from "../../../../../../hook/useTranslate";

function useSelectedStudent() {
	const { groupID, courseID, studentID } = useLocalSearchParams();
	// redux
	const { groups } = useSelector((state) => state.groups);
	return useMemo(() => {
		// close if no groups
		if (!groups.length) return;
		// filter out students
		const selectedGroup = groups.filter((group) => group.id === groupID)[0];
		const selectedCourse = selectedGroup.courses.filter(
			(course) => course.id === courseID,
		)[0];
		const selectedStudent = selectedCourse.floatingStudents.filter(
			(student) => student.id === studentID,
		)[0];
		return selectedStudent;
	}, [groups]);
}

function Plans({ plans }) {
	// get the plans
	const { isLoading, error } = usePlans();
	// render the plans
	if (isLoading) return <ActivityIndicator />;
	else
		return (
			<FlatList
				data={plans}
				style={{ overflow: "visible" }}
				renderItem={({ item }) => (
					<PlanCard plan={item} key={item.id} />
				)}
				// keyExtractor={(_, i) => i}
				// contentContainerStyle={{ direction: "ltr" }}
				horizontal
			/>
		);
}

export default function () {
	const translate = useTranslate();
	const pathname = usePathname();
	const colorScheme = useColorScheme();
	// advanced Days
	const plans = useWhichInstanceIsToday();
	const advancedDays = eachDay(plans);
	// selectedStudent
	const selectedStudent = useSelectedStudent();

	return (
		<ScreenView>
			<View
				style={[styles.plansAreaContainer, { alignItems: "flex-end" }]}
			>
				<ScreenText variant="displayMedium">
					{selectedStudent?.first_name}
				</ScreenText>
			</View>
			<GlobalDatePicker />
			<View style={styles.plansAreaContainer}>
				<ScreenText variant="headlineLarge">
					{translate("plans")}
				</ScreenText>
				<Link href={`${pathname}/addPlan`}>
					<Ionicons
						name="add-circle-outline"
						color={colorScheme === "light" ? "black" : "white"}
						size={36}
					/>
				</Link>
			</View>
			{/* plans */}
			<View>
				<Plans plans={plans} />
			</View>
			{/* advanced cards */}
			<ScreenText variant="headlineLarge">
				{translate("rating")}
			</ScreenText>
			{advancedDays?.map((plan) => (
				<AdvancedCard plan={plan} key={plan.id} />
			))}
		</ScreenView>
	);
}

// ![I think it's for rabt] each day advantage
function eachDay(plans) {
	return useMemo(
		() =>
			plans?.reduce((acc, plan) => {
				plan.day?.forEach((day) => {
					acc.push({
						...plan,
						day,
					});
				});
				return acc;
			}, []) || [],
		[plans],
	);
}

const styles = StyleSheet.create({
	plansAreaContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 30,
	},
});

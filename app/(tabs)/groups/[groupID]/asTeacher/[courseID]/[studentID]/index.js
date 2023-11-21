import { useState, useMemo } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { usePathname, Link } from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../../../../../../../components/ScreenText";
import AdvancedArea from "../../../../../../../components/plans/AdvancedArea";
import PlansArea from "../../../../../../../components/plans/PlansArea";
import ScrollViewWithPicker from "../../../../../../../components/ScrollViewWithPicker";

const list = ["one", "two", "three", "four", "five", "six"];
// hooks
import useTranslate from "../../../../../../../hook/useTranslate";
import useSelectedStudent from "../../../../../../../hook/useSelectedStudent";
import useWhichInstanceIsToday from "../../../../../../../hook/plans/useWhichInstanceIsToday";

const navigationData = [
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
];

export default function () {
	const translate = useTranslate();
	const pathname = usePathname();
	const colorScheme = useColorScheme();
	const { groups } = useSelector((state) => state.groups);
	// advanced Days
	const plans = useWhichInstanceIsToday();
	const advancedDays = eachDay(plans);
	// selectedStudent
	const selectedStudent = useSelectedStudent();
	//
	const selectedNumberState = useState(0);
	function onSlide(newVal) {
		// console.log({ newVal, selectedNumber: selectedNumberState[0] });
	}
	return (
		<ScrollViewWithPicker navigationData={navigationData}>
			{/* <View
				style={[styles.plansAreaContainer, { alignItems: "flex-end" }]}
			>
				<ScreenText variant="displayMedium">
					{selectedStudent?.first_name}
				</ScreenText>
			</View> */}
			{/* <GlobalDatePicker /> */}
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
			<PlansArea plans={plans} />
			{/* advanced cards */}
			<AdvancedArea advancedDays={advancedDays} />
		</ScrollViewWithPicker>
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

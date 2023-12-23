import { useState, useMemo } from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	useColorScheme,
	TouchableOpacity,
} from "react-native";
import { usePathname, Stack, useRouter } from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../../../../../../../components/ScreenText";
import AdvancedArea from "../../../../../../../components/plans/AdvancedArea";
import PlansArea from "../../../../../../../components/plans/PlansArea";
import ScreenView from "../../../../../../../components/ScreenView";
import HeaderButton from "../../../../../../../components/HeaderButton";
import MenuButton from "../../../../../../../components/CoolScrollView/MenuButton";
import DatePickerViewV2 from "../../../../../../../components/DatePickerViewV2";

const list = ["one", "two", "three", "four", "five", "six"];
// hooks
import useTranslate from "../../../../../../../hook/useTranslate";
import useSelectedStudent from "../../../../../../../hook/useSelectedStudent";
import useWhichInstanceIsToday from "../../../../../../../hook/plans/useWhichInstanceIsToday";

export default function () {
	const translate = useTranslate();
	// router
	const router = useRouter();
	const pathname = usePathname();
	const colorScheme = useColorScheme();
	const { groups } = useSelector((state) => state.groups);
	// selectedStudent
	const selectedStudent = useSelectedStudent();
	// advanced Days
	const plans = useWhichInstanceIsToday();
	const advancedDays = eachDay(plans);
	return (
		<DatePickerViewV2>
			<Stack.Screen
				options={{
					headerTitle: selectedStudent._j.first_name,
				}}
			/>
			<ScrollView style={{ marginTop: 20 }}>
				<View style={styles.plansAreaContainer}>
					<ScreenText variant="headlineLarge">
						{translate("plans", true)}
					</ScreenText>
					<TouchableOpacity
						onPress={() => router.push(`${pathname}/addPlan`)}
					>
						<Ionicons
							name="add-circle-outline"
							color={colorScheme === "light" ? "black" : "white"}
							size={36}
						/>
					</TouchableOpacity>
				</View>
				{/* plans */}
				<PlansArea plans={plans} />
				{/* advanced cards */}
				<AdvancedArea advancedDays={advancedDays} />
			</ScrollView>
		</DatePickerViewV2>
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

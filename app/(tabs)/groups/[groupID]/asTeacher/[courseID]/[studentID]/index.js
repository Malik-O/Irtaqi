import "../../../../../../../wdyr";
import { memo, useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	useColorScheme,
	TouchableOpacity,
	Text,
	ActivityIndicator,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
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
import PlanBottomSheet from "../../../../../../../components/PlanBottomSheet";
import Agenda from "../../../../../../../components/Agenda";
import AddPlanBottomSheet from "../../../../../../../components/AddPlanBottomSheet";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const list = ["one", "two", "three", "four", "five", "six"];
// hooks
import useTranslate from "../../../../../../../hook/useTranslate";
import useSelectedStudent from "../../../../../../../hook/useSelectedStudent";
import useWhichInstanceIsToday from "../../../../../../../hook/plans/useWhichInstanceIsToday";
import useTheme from "../../../../../../../hook/useTheme";
import usePlanInstanceString from "../../../../../../../hook/plans/usePlanInstanceString";

let timeout;
function index() {
	const translate = useTranslate();
	// router
	const router = useRouter();
	const pathname = usePathname();
	const colorScheme = useColorScheme();
	const theme = useTheme();
	const { groups } = useSelector((state) => state.groups);
	// selectedStudent
	const selectedStudent = useSelectedStudent();
	// advanced Days
	const plans = useWhichInstanceIsToday();
	const advancedDays = eachDay(plans);
	// Bottom Sheet
	const sheetRef = useRef(null);
	const [selectedPlan, setSelectedPlan] = useState({});
	const isLoading = useSharedValue(false);
	const openSheet = useCallback((plan) => {
		sheetRef.current?.present();
		isLoading.value = true;
		console.log("sheetRef:", sheetRef.current);
		// timeout
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setSelectedPlan(plan);
			isLoading.value = false;
		}, 200);
	}, []);
	// useEffect(() => {
	// 	sheetRef.current?.onChange &&
	// 		sheetRef.current?.onChange(() => {
	// 			console.log("disssssssssssss");
	// 		});
	// }, [sheetRef.current]);
	//
	const addPlanSheetRef = useRef(null);

	return (
		// <BottomSheetModalProvider>
		<>
			<Stack.Screen
				options={{
					headerTitle: selectedStudent._j.first_name,
					headerStyle: { backgroundColor: theme.secondary },
					// headerBackground: () => null,
					// gestureEnabled: true,
					headerShown: true,
					headerTitleStyle: { color: theme.reverse.secondary },
					headerLeft: () => <HeaderButton isExists={true} back />,
				}}
			/>
			<ScreenView
				paddingTop={false}
				hasScrollView={false}
				hasLoading={true}
			>
				<Agenda>
					<ScrollView style={{ marginTop: 20 }}>
						<View style={styles.plansAreaContainer}>
							<ScreenText variant="headlineLarge">
								{translate("plans", true)}
							</ScreenText>
							<TouchableOpacity
								onPress={() => {
									addPlanSheetRef.current?.snapToIndex(1);
									// router.push(`${pathname}/addPlan`);
								}}
							>
								<Ionicons
									name="add-circle-outline"
									color={
										colorScheme === "light"
											? "black"
											: "white"
									}
									size={36}
								/>
							</TouchableOpacity>
						</View>
						{/* plans */}
						<PlansArea plans={plans} openSheet={openSheet} />
						{/* advanced cards */}
						<AdvancedArea advancedDays={advancedDays} />
					</ScrollView>
				</Agenda>
				{/* bottom sheets */}
				{/* <AddPlanBottomSheet sheetRef={addPlanSheetRef} /> */}
				<PlanBottomSheet
					sheetRef={sheetRef}
					selectedPlan={selectedPlan}
					isLoading={isLoading}
				/>
			</ScreenView>
		</>
		// </BottomSheetModalProvider>
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
// index.whyDidYouRender = {
// 	logOnDifferentValues: true,
// };
export default memo(index);

const styles = StyleSheet.create({
	plansAreaContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 30,
	},
});

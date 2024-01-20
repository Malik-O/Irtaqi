import { useState, useMemo } from "react";
import { View } from "react-native";
import {
	useRouter,
	useLocalSearchParams,
	ActivityIndicator,
} from "expo-router";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
import { addPlanActions } from "../../store/addPlan";
// apollo
import graphQl from "../../graphQl";
import { useMutation } from "@apollo/client";
// components
import { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "../BottomSheet";
import Stepper from "../Stepper";
import DismissKeyboard from "../DismissKeyboard";
// hook
import connectToPlansStore from "../../hook/useConnectToStore/instants/connectToPlansStore";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// steps components
import pageAmount from "./pageAmount";
import directionPicker from "./directionPicker";
import startingFrom from "./startingFrom";
import dateStep from "./dateStep";
import workingDays from "./workingDays";
import ScreenText from "../ScreenText";
// utils
import numberTranslatorToEn from "../../utils/numberTranslatorToEn";

// create a view component with dismiss hook
const DismissKeyboardView = DismissKeyboard();

function pageNumberFromVerseKey(versesPerPage, verse_key) {
	let pageNumber;
	versesPerPage.pages.every((page, i) => {
		const exists = page.some((verse) => verse.verse_key === verse_key);
		if (exists) {
			pageNumber = i + 1;
			return false;
		}
		return true;
	});
	return pageNumber;
}

function useAddPlan(sheetRef) {
	const [loading, setLoading] = useState(false);
	const { studentID } = useLocalSearchParams();
	const router = useRouter();
	// connect with plan store
	const PlanStoreConnectionsInstance = connectToPlansStore();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	const { versesPerPage } = useSelector((state) => state.quran);
	// graphQL mutation
	const AddPlan = graphQl.mutations.AddPlan;
	const [addPlanAction] = useMutation(AddPlan);
	async function doAddPlan() {
		setLoading(true);
		// get page from verse_key
		const verse_key = `${formData.fromSurah + 1}:${formData.fromVerse}`;
		const variables = {
			amount: +numberTranslatorToEn(formData.amount),
			from: pageNumberFromVerseKey(versesPerPage, verse_key),
			weeks: +numberTranslatorToEn(formData.weeks),
			entityId: studentID,
			entityType: "student",
			title: formData.planTitle,
			workingDays: formData.workingDays,
			orderReversed: !!formData.isReversed,
			startingAt: formData.startingDate.getTime() + "",
			color: "red",
			rabtAmount: formData.hasRabt
				? +numberTranslatorToEn(formData.rabtAmount)
				: 0,
			note: "",
		};
		console.log("variables:", variables);
		try {
			// do req
			const data = await addPlanAction({ variables });
			console.log("data:", data);
			// add locally
			PlanStoreConnectionsInstance.add(data.data.addPlan);
		} catch (error) {
			console.log("error:", error);
		}
		setLoading(false);
	}
	return { doAddPlan, loading };
}

export default function ({ sheetRef, isLoading }) {
	const translate = useTranslate();
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [
		{ ele: workingDays, isStepValid: "workingDays_isValid" },
		{ ele: dateStep, isStepValid: "dateStep_isValid" },
		{ ele: pageAmount, isStepValid: "pageAmount_isValid" },
		{ ele: directionPicker, isStepValid: "directionPicker_isValid" },
		{ ele: startingFrom, isStepValid: "startingFrom_isValid" },
	];
	// redux
	const { doAddPlan, loading } = useAddPlan(sheetRef);
	const { formData } = useSelector((state) => state.addPlan);
	// callbacks
	const snapPoints = useMemo(() => ["90%"], []);
	// Bottom Sheet loading style
	const contentStyle = useAnimatedStyle(() => ({
		display: isLoading?.value ? "none" : "flex",
	}));
	const indicatorStyle = useAnimatedStyle(() => ({
		display: isLoading?.value ? "flex" : "none",
	}));

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			storeAction={addPlanActions}
			onChange={(index) => index === -1 && setActiveIndex(0)}
			enableDismissOnClose
			loading={loading}
		>
			<BottomSheetView style={{ flex: 1 }}>
				<DismissKeyboardView>
					<View>
						{/* <Animated.View style={indicatorStyle}>
							<ActivityIndicator />
						</Animated.View> */}
						<Animated.View style={contentStyle}>
							<Stepper
								title={translate("addPlan", true)}
								steps={steps}
								activeIndex={activeIndex}
								setActiveIndex={setActiveIndex}
								submitEvent={{
									mutationAction: doAddPlan,
									loading,
								}}
								formData={formData}
							/>
						</Animated.View>
					</View>
				</DismissKeyboardView>
			</BottomSheetView>
		</BottomSheet>
	);
}

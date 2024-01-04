import { useCallback, useState, useMemo } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
// redux
import { useSelector } from "react-redux";
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
import useCreateUser from "../../hook/user/useCreateUser";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// styles
import { SHADOWS } from "../../styles/layout";
// steps components
import pageAmount from "./pageAmount";
import directionPicker from "./directionPicker";
import startingFrom from "./startingFrom";
import dateStep from "./dateStep";
import workingDays from "./workingDays";

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
const arabicNumbs2EnglishNumbs = (s) =>
	s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

function useAddPlan() {
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
			amount: +arabicNumbs2EnglishNumbs(formData.amount),
			from: pageNumberFromVerseKey(versesPerPage, verse_key),
			weeks: +arabicNumbs2EnglishNumbs(formData.weeks),
			entityId: studentID,
			entityType: "student",
			title: formData.planTitle,
			workingDays: formData.workingDays,
			orderReversed: !!formData.isReversed,
			startingAt: formData.startingDate.getTime() + "",
			color: "red",
			rabtAmount: formData.hasRabt
				? +arabicNumbs2EnglishNumbs(formData.rabtAmount)
				: 0,
			note: "",
		};
		try {
			// do req
			const data = await addPlanAction({ variables });
			// console.log("data:", data);
			// add locally
			PlanStoreConnectionsInstance.add(data.data.addPlan);
		} catch (error) {
			console.log("error:", error);
		}
		router.back();
		setLoading(false);
	}
	return { doAddPlan, loading };
}

export default function ({ sheetRef }) {
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
	const { doAddPlan, loading } = useAddPlan();
	const { formData } = useSelector((state) => state.addPlan);
	// callbacks
	const snapPoints = useMemo(() => ["90%"], []);
	const handleSheetChange = useCallback((index) => {
		console.log("handleSheetChange", index);
	}, []);

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			enableDismissOnClose
		>
			<BottomSheetView style={{ flex: 1 }}>
				<DismissKeyboardView>
					<Stepper
						title={translate("addPlan", true)}
						steps={steps}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						submitEvent={{ mutationAction: doAddPlan, loading }}
						formData={formData}
					/>
				</DismissKeyboardView>
			</BottomSheetView>
		</BottomSheet>
	);
}

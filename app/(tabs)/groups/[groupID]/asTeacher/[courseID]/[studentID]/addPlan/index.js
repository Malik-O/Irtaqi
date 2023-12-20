import { useState } from "react";
import { Button, SafeAreaView } from "react-native";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addPlanActions } from "../../../../../../../../store/addPlan";
// apollo
import graphQl from "../../../../../../../../graphQl";
import { useMutation } from "@apollo/client";
// components
import Stepper from "../../../../../../../../components/Stepper";
// hook
import connectToPlansStore from "../../../../../../../../hook/useConnectToStore/instants/connectToPlansStore";
import useCreateUser from "../../../../../../../../hook/useCreateUser";
import useTranslate from "../../../../../../../../hook/useTranslate";
// steps components
import pageAmount from "../../../../../../../../components/addPlanSteps/pageAmount";
import directionPicker from "../../../../../../../../components/addPlanSteps/directionPicker";
import startingFrom from "../../../../../../../../components/addPlanSteps/startingFrom";
import dateStep from "../../../../../../../../components/addPlanSteps/dateStep";
import workingDays from "../../../../../../../../components/addPlanSteps/workingDays";
// utils
import capitalize from "../../../../../../../../utils/capitalize";

// async function doAddPlan({
// 	addPlanAction,
// 	variables,
// 	dispatch,
// 	router,
// 	PlanStoreConnectionsInstance,
// }) {
// 	const AddPlan = graphQl.mutations.AddPlan;
// 	const [addPlanAction, { data, loading, error }] = useMutation(AddPlan);

// 	const router = useRouter();
// 	const variables = {
// 		from: surahNames.indexOf(selectedSurah) + 1,
// 		amount: +amount,
// 		weeks: +weeks,
// 		entityId: studentID,
// 		entityType: "student",
// 		title: typeSelected,
// 		workingDays: selectedDays,
// 		orderReversed: directions === "progressive",
// 		startingAt: startingAt.getTime() + "",
// 	};
// 	// const { data } = await addPlanAction({ variables });
// 	console.log("data:", { ...variables, ...data, id: data.addPlan.id });
// 	// PlanStoreConnectionsInstance.add([{ ...variables, ...data.addPlan }]);
// 	// dispatch(plansActions.addPlans([{ ...variables, id: data.addPlan.id }]));
// 	// router.back();
// }

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

export default function () {
	const translate = useTranslate();
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [
		{ ele: workingDays, isStepValid: "workingDays_isValid" },
		{ ele: dateStep, isStepValid: "dateStep_isValid" },
		{ ele: pageAmount, isStepValid: "pageAmount_isValid" },
		{ ele: directionPicker, isStepValid: "directionPicker_isValid" },
		{ ele: startingFrom, isStepValid: "startingFrom_isValid" },
	];
	// connect with plan store
	const PlanStoreConnectionsInstance = connectToPlansStore();
	// mutation
	const { doAddPlan, loading } = useAddPlan();
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	const { pages, surahAdj, versesPerPage } = useSelector(
		(state) => state.quran,
	);
	return (
		<Stepper
			title={translate("addPlan", true)}
			steps={steps}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			submitEvent={{ mutationAction: doAddPlan, loading }}
			formData={formData}
		/>
	);
}

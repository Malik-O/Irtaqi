import { useCallback, useState, useMemo } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
// redux
import { useSelector } from "react-redux";
// apollo
import graphQl from "../../graphQl";
import { useMutation } from "@apollo/client";
// components
import { BottomSheetView, BottomSheetModal } from "@gorhom/bottom-sheet";
import Stepper from "../Stepper";
import BottomSheet from "../BottomSheet";
import DismissKeyboard from "../DismissKeyboard";
// hook
import connectToPlansStore from "../../hook/useConnectToStore/instants/connectToPlansStore";
import useCreateUser from "../../hook/user/useCreateUser";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// styles
import { SHADOWS } from "../../styles/layout";
// steps components
import RoleStep from "./RoleStep";
import NameStep from "./NameStep";
import NationalIDStep from "./NationalIDStep";
import ContactStep from "./ContactStep";
import AddToGroupStep from "./AddToGroupStep";
import GenderStep from "./GenderStep";

// create a view component with dismiss hook
const DismissKeyboardView = DismissKeyboard();

export default function ({ sheetRef }) {
	const translate = useTranslate();
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [
		{ ele: RoleStep, isStepValid: "RoleStep_isValid" },
		{ ele: NameStep, isStepValid: "NameStep_isValid" },
		{ ele: AddToGroupStep, isStepValid: "AddToGroupStep_isValid" },
		// { ele: GenderStep, isStepValid: "GenderStep_isValid" },
		{ ele: NationalIDStep, isStepValid: "NationalIDStep_isValid" },
		{ ele: ContactStep, isStepValid: "ContactStep_isValid" },
	];
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const { mutationAction, loading } = useCreateUser(sheetRef);
	// callbacks
	const snapPoints = useMemo(() => ["90%"], []);
	const handleSheetChange = useCallback((index) => {
		// console.log("handleSheetChange", index);
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
						title={translate("addUser", true)}
						steps={steps}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						submitEvent={{ mutationAction, loading }}
						formData={formData}
					/>
				</DismissKeyboardView>
			</BottomSheetView>
		</BottomSheet>
	);
}

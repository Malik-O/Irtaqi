import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../../../../../../store/addUser";
// components
import Stepper from "../../../../../../components/Stepper";
// hook
import useCreateUser from "../../../../../../hook/useCreateUser";
import useTranslate from "../../../../../../hook/useTranslate";
// steps components
import NameStep from "../../../../../../components/addUserSteps/NameStep";
import NationalIDStep from "../../../../../../components/addUserSteps/NationalIDStep";
import ContactStep from "../../../../../../components/addUserSteps/ContactStep";
import AddToGroupStep from "../../../../../../components/addUserSteps/AddToGroupStep";
import GenderStep from "../../../../../../components/addUserSteps/GenderStep";

export default function () {
	const translate = useTranslate();
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [
		{ ele: AddToGroupStep, isStepValid: "AddToGroupStep_isValid" },
		{ ele: GenderStep, isStepValid: "GenderStep_isValid" },
		{ ele: NameStep, isStepValid: "NameStep_isValid" },
		{ ele: NationalIDStep, isStepValid: "NationalIDStep_isValid" },
		{ ele: ContactStep, isStepValid: "ContactStep_isValid" },
	];
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	//
	const { mutationAction, loading } = useCreateUser();
	// function submitEvent() {
	// 	createUser();
	// }

	return (
		<Stepper
			title={translate("addUser")}
			steps={steps}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			submitEvent={{ mutationAction, loading }}
			formData={formData}
		/>
	);
}

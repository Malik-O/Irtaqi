import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// components
import Stepper from "../../../../../../../../components/Stepper";
// hook
import useCreateUser from "../../../../../../../../hook/useCreateUser";
// steps components
import RangeStep from "../../../../../../../../components/addPlanSteps/RangeStep";

export default function () {
	const [activeIndex, setActiveIndex] = useState(0);
	const steps = [{ ele: RangeStep, isStepValid: "RangeStep_isValid" }];
	// redux
	const { formData } = useSelector((state) => state.addPlan);
	const dispatch = useDispatch();
	//
	const { mutationAction, loading } = useCreateUser();

	return (
		<Stepper
			steps={steps}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			submitEvent={{ mutationAction, loading }}
			formData={formData}
		/>
	);
}

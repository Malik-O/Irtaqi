import { View } from "react-native";
// Components
import ScreenView from "../ScreenView";
import StepHead from "./Step";
import StepperButton from "./StepperButton";
import StepperContent from "./StepperContent";
import SubmitButton from "./SubmitButton";
// styles
import { Text } from "react-native-paper";
import styles from "./styles";
import { paddingHorizontal } from "../../styles/layout";
//hook
import useTranslate from "../../hook/useTranslate";

export default function ({
	title,
	steps,
	activeIndex,
	setActiveIndex,
	submitEvent,
	formData,
}) {
	const translate = useTranslate();
	// is valid
	const isStepValidValue = formData[steps[activeIndex]?.isStepValid];
	return (
		<View>
			<Text
				variant="headlineLarge"
				style={{ marginBottom: paddingHorizontal, paddingHorizontal }}
			>
				{title}
			</Text>
			<View style={styles.dashesContainer}>
				{steps.map((s, i) => (
					<StepHead activeIndex={activeIndex} i={i} key={i} />
				))}
			</View>
			{/* stepper content */}
			<StepperContent steps={steps} activeIndex={activeIndex} />
			{/* buttons */}
			<View style={styles.buttonsContainer}>
				<StepperButton
					stepValue={-1}
					stepsLength={steps.length}
					setActiveIndex={setActiveIndex}
					activeIndex={activeIndex}
				/>
				{activeIndex === steps.length - 1 ? (
					<SubmitButton
						isStepValid={isStepValidValue}
						submitEvent={submitEvent}
					/>
				) : (
					<StepperButton
						stepValue={1}
						stepsLength={steps.length}
						setActiveIndex={setActiveIndex}
						activeIndex={activeIndex}
						isStepValid={isStepValidValue}
					/>
				)}
			</View>
		</View>
	);
}

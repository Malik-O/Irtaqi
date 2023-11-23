import { View, Dimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../../store/addUser";
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
import useTheme from "../../hook/useTheme";
// styles
import { buttonsSize } from "./styles";

const { width } = Dimensions.get("screen");

export default function ({ steps, activeIndex, setActiveIndex, submitEvent }) {
	const translate = useTranslate();
	const theme = useTheme();
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	// is valid
	const isStepValidValue = formData[steps[activeIndex]?.isStepValid];

	return (
		<ScreenView>
			<Text
				variant="headlineLarge"
				style={{ marginBottom: paddingHorizontal, paddingHorizontal }}
			>
				{translate("addUser")}
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
		</ScreenView>
	);
}

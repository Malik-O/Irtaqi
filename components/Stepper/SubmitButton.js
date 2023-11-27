import { TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
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

export default function ({
	isStepValid,
	submitEvent: { mutationAction, loading },
}) {
	const translate = useTranslate();
	const theme = useTheme();
	// redux
	const opacityStyle = useAnimatedStyle(() => ({
		opacity: isStepValid ? withTiming(1) : withTiming(0.4),
	}));
	return (
		<TouchableOpacity onPress={mutationAction}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<Animated.Text
					style={[styles.actionButton(theme.primary), opacityStyle]}
				>
					{translate("add")}
				</Animated.Text>
			)}
		</TouchableOpacity>
	);
}

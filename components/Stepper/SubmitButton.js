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
import usePush from "../../hook/notifications/usePush";
// styles
import { buttonsSize } from "./styles";

const { width } = Dimensions.get("screen");

export default function ({
	isStepValid,
	submitEvent: { mutationAction, loading },
}) {
	console.log("isStepValid:", isStepValid);
	const translate = useTranslate();
	const theme = useTheme();
	const pushNotification = usePush();
	// redux
	const opacityStyle = useAnimatedStyle(() => ({
		opacity: isStepValid ? withTiming(1) : withTiming(0.4),
	}));
	//
	function onPress() {
		if (isStepValid) mutationAction();
		else
			pushNotification({
				type: "error",
				message: "CompleatForm",
				floatingNotification: true,
			});
	}
	return (
		<TouchableOpacity onPress={onPress}>
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

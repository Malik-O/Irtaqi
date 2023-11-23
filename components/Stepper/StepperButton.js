import { View, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// Components
import Ionicons from "@expo/vector-icons/Ionicons";
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
// hook
import useTheme from "../../hook/useTheme";
// utils
import validValue from "./utils/validValue";
// styles
import { buttonsSize } from "./styles";

export default function ({
	isStepValid = true,
	stepValue = 1,
	stepsLength,
	setActiveIndex,
	activeIndex,
}) {
	const theme = useTheme();
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// value
	const newValue = activeIndex + stepValue;
	const isValid = validValue(newValue, stepsLength);
	function onPress() {
		setActiveIndex(newValue);
	}
	if (isValid) {
		if (isStepValid) 1;
		else if (isStepValid) 0.4;
	} else 0;
	const opacityStyle = useAnimatedStyle(() => ({
		opacity: isValid
			? isStepValid
				? withTiming(1)
				: withTiming(0.4)
			: withTiming(0),
	}));
	return (
		<TouchableOpacity
			disabled={!(isValid && isStepValid)}
			onPress={onPress}
		>
			<AnimatedIonicons
				name={
					stepValue * (-1) ** !isRTL < 0
						? "chevron-forward"
						: "chevron-back"
				}
				size={buttonsSize}
				color={theme.reverse.secondary}
				style={opacityStyle}
			/>
		</TouchableOpacity>
	);
}

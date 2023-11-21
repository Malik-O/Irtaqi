import { Dimensions } from "react-native";
// animated
import Animated, {
	useAnimatedStyle,
	runOnJS,
	useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
// styles
import { WIDTH } from "./styles";
import useTheme from "../../hook/useTheme";

// util
function clamp(number, min, max) {
	"worklet";
	return Math.max(min, Math.min(number, max));
}

export default function ({
	animatedPercent,
	translateX,
	onChange,
	isActive,
	ballSize,
}) {
	const theme = useTheme();
	//Gesture Handler Events
	function onFinish() {
		"worklet";
		isActive.value = false;
	}
	const panGestureEvent = useAnimatedGestureHandler({
		onStart(event, context) {
			isActive.value = true;
			context.prevTranslateX = translateX.value;
		},
		onActive(event, context) {
			const newTranslateX = event.translationX + context.prevTranslateX;
			newTranslateX = clamp(newTranslateX, 0, WIDTH - ballSize);
			translateX.value = newTranslateX;
			// update percent value
			const newAnimatedPercent = (newTranslateX + ballSize) / WIDTH;
			animatedPercent.value = newAnimatedPercent;
			runOnJS(onChange)(newAnimatedPercent);
		},
		onEnd: onFinish,
		onCancel: onFinish,
		onFail: onFinish,
	});
	// animated styles
	const ballStyle = useAnimatedStyle(() => ({
		width: ballSize,
		height: ballSize,
		borderRadius: ballSize,
		right: ballSize / 2,
		bottom: -ballSize / 2,
		transform: [{ translateX: translateX.value }],
	}));
	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View
				// entering={FadeInDown}
				style={[
					ballStyle,
					{
						backgroundColor: theme.cardColor,
						// opacity: 0.5,
						zIndex: 100,
						position: "absolute",
					},
				]}
			></Animated.View>
		</PanGestureHandler>
	);
}

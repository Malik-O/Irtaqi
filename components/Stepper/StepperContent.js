import { View, Dimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

export default function stepperContent({ steps, activeIndex }) {
	const stepperContentStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(width * activeIndex) }],
	}));
	return (
		<View>
			<Animated.View
				style={[stepperContentStyle, { flexDirection: "row" }]}
			>
				{steps.map((step, i) => (
					<View style={{ width }} key={i}>
						{step?.ele(step?.isStepValid)}
					</View>
				))}
			</Animated.View>
		</View>
	);
}

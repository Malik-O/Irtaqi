import { View, Dimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
//
import StepHead from "./StepHead";
// styles
import { paddingHorizontal } from "../../styles/layout";

const { width } = Dimensions.get("screen");

export default function ({ tabs, activeIndex, setActiveIndex, params }) {
	const stepperContentStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(width * activeIndex) }],
	}));
	return (
		<View>
			<StepHead
				tabs={tabs}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>
			<Animated.View
				style={[
					stepperContentStyle,
					{ flexDirection: "row", marginTop: paddingHorizontal },
				]}
			>
				{tabs.map((tab, i) => {
					return (
						<View style={{ width }} key={i}>
							{tab?.ele(params)}
						</View>
					);
				})}
			</Animated.View>
		</View>
	);
}

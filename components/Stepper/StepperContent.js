import { View, Dimensions, FlatList } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

export default function stepperContent({ steps, activeIndex }) {
	// const stepperContentStyle = useAnimatedStyle(() => ({
	// 	transform: [{ translateX: withTiming(width * activeIndex) }],
	// }));
	return (
		<FlatList
			contentContainerStyle={[
				{
					// flexDirection: "row",
				},
			]}
			data={steps}
			horizontal
			showsHorizontalScrollIndicator={false}
			renderItem={({ item, index }) => {
				// console.log("item:", item);
				return (
					<View style={{ width, backgroundColor: "red" }} key={index}>
						<item.ele />
					</View>
				);
			}}
		/>
	);
}

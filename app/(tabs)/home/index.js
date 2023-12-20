import { View, Text, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
// components
import AnimatedHeader from "../../../components/CoolScrollView/AnimatedHeader";
import CoolRefreshableView from "../../../components/CoolRefreshableView";
import ScreenView from "../../../components/ScreenView";
// hook
import useZero from "../../../hook/useZero";

const navigationData = [
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
];

const { height } = Dimensions.get("screen");

function List() {
	const zero = useZero();
	const translateY = useSharedValue(zero);
	const titleDim = useSharedValue({});
	const props = {
		title: "notifications",
		back: true,
		more: false,
	};

	function onScroll(e) {
		translateY.value = e.nativeEvent.contentOffset.y + zero;
	}

	const flatListStyle = useAnimatedStyle(() => ({
		paddingTop: zero + 130,
	}));
	return (
		<ScreenView hasScrollView={false} paddingTop={false}>
			<Animated.FlatList
				style={[{ marginBottom: 100 }]}
				data={navigationData}
				onScroll={onScroll}
				scrollEventThrottle={16}
				keyExtractor={(_, i) => i}
				renderItem={({ item, index }) => {
					return (
						<Text
							style={{ fontSize: 30, color: "red" }}
							key={index}
						>
							{item.first_name}
						</Text>
					);
				}}
			/>
		</ScreenView>
	);
}
export default function () {
	return <List />;
	// return (
	// 	<CoolRefreshableView navigationData={navigationData}>
	// 		<Text style={{ height: 1000, color: "red" }}>index</Text>
	// 	</CoolRefreshableView>
	// );
}

import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Animated, {
	useAnimatedProps,
	useSharedValue,
} from "react-native-reanimated";
// components
import Svg, { Path } from "react-native-svg";
import GlobalDatePicker from "../../components/GlobalDatePicker";
import { paddingHorizontal } from "../../styles/layout";
import CollapseIndicator from "./CollapseIndicator";
// styles
// import { dayButtonTextInnerHight } from "../GlobalDatePicker/styles";
import styles, {
	MAGIC_NUM,
	MIN_BUBBLE_HEIGHT,
	MAX_BUBBLE_SHIFT,
} from "./styles";
// hook
// import useWeeks from "../../hook/globalDatePicker/useWeeks";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width, height } = Dimensions.get("window");

function vec2(x, y) {
	"worklet";
	return { x, y };
}
function curve(c1, c2, to) {
	"worklet";
	return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}

export default function () {
	// const { monthWeeks, selectedRow } = useWeeks();
	// const datePickerFullHeight = dayButtonTextInnerHight * monthWeeks.length;
	//
	const R = useRef(useSharedValue(1)).current;
	const bubbleHeight = useRef(useSharedValue(MIN_BUBBLE_HEIGHT)).current;
	const bubbleShift = useRef(useSharedValue(0)).current;
	const translateY = useRef(useSharedValue(0)).current;
	const bgPathProps = useAnimatedProps(() => {
		// R.value = isActive.value ? withSpring(70) : withSpring(40);
		const C = R.value * MAGIC_NUM;
		const middlePoint = vec2(
			width / 2,
			bubbleHeight.value + bubbleShift.value,
		);
		const endPoint = vec2(0, bubbleHeight.value);
		const c1 = vec2(middlePoint.x - C, middlePoint.y);
		const c2 = vec2(endPoint.x, endPoint.y);
		// radius driven values
		const d = [
			"M 0 0",
			`H ${width}`,
			`V ${bubbleHeight.value}`,
			curve(c1, c2, endPoint),
			"Z",
		];
		return { d: d.join(" ") };
	});
	const isCollapseOpenState = useState(false);
	const [isCollapseOpen, setIsCollapseOpen] = isCollapseOpenState;
	return (
		<SafeAreaView style={StyleSheet.absoluteFill}>
			<Svg style={styles.bobbleSVG}>
				<AnimatedPath fill="#88B9F2" animatedProps={bgPathProps} />
			</Svg>
			<CollapseIndicator
				bubbleHeight={bubbleHeight}
				bubbleShift={bubbleShift}
			/>
			<GlobalDatePicker isCollapseOpenState={isCollapseOpenState} />
		</SafeAreaView>
	);
}

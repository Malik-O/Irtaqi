import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, StatusBar } from "react-native";
import {
	interpolate,
	useDerivedValue,
	useSharedValue,
	Extrapolation,
} from "react-native-reanimated";
import { Path, Skia, Canvas, Group } from "@shopify/react-native-skia";
// styles
import { dayButtonTextInnerHight } from "../../GlobalDatePicker/styles";
import styles, {
	MAGIC_NUM,
	MIN_BUBBLE_HEIGHT,
	MAX_BUBBLE_SHIFT,
	minHeight,
	navigateHight,
} from "../styles";
// hook
import useWeeks from "../../../hook/globalDatePicker/useWeeks";
// utils
import { vec2 } from "../../../utils/pathPoints";
import interpolateBubbleShift from "../utils/interpolateBubbleShift";
// component
import LiquidPaint from "./LiquidPaint";
import Slime from "./Slime";

const { width } = Dimensions.get("window");

export default function ({ translateY, collapseOpen, inputRange, zero }) {
	// some shared values
	const R = useRef(useSharedValue(1)).current;
	// bubble shapes
	const bubblePath = (pathHeight, translateY) => {
		"worklet";
		const _bubbleShift = interpolateBubbleShift(pathHeight, inputRange);
		// console.log(translateY.value, navigateHight);
		// overscroll
		const animatedZero =
			translateY.value < navigateHight + zero
				? interpolate(
						translateY.value,
						[navigateHight + zero, zero],
						[zero, zero + navigateHight],
						Extrapolation.CLAMP,
				  )
				: zero;
		const path = Skia.Path.Make();
		const C = R.value * MAGIC_NUM;
		const middlePoint = vec2(
			width / 2,
			pathHeight + _bubbleShift + animatedZero,
		);
		const endPoint = vec2(0, pathHeight + animatedZero);
		const c1 = vec2(middlePoint.x - C, middlePoint.y);
		const c2 = vec2(endPoint.x, endPoint.y);

		path.moveTo(0, animatedZero);
		path.lineTo(width, animatedZero);
		path.lineTo(width, pathHeight + animatedZero);
		path.cubicTo(c1.x, c1.y, c2.x, c2.y, endPoint.x, endPoint.y);
		path.close();
		return path;
	};
	const startShape = useDerivedValue(
		() => bubblePath(inputRange[0], translateY),
		[translateY],
	);
	const endShape = useDerivedValue(
		() => bubblePath(inputRange[1], translateY),
		[translateY],
	);
	const bubbleShape = useDerivedValue(() => {
		return endShape.value.interpolate(startShape.value, collapseOpen.value);
	}, [collapseOpen]);
	// navigate shapes
	const navigateTopShape = useDerivedValue(() => {
		const path = Skia.Path.Make();
		// console.log("zero:", zero);
		path.moveTo(0, 0);
		path.lineTo(width, 0);
		path.lineTo(width, zero);
		path.lineTo(0, zero);
		path.close();
		return path;
	}, []);
	const navigateBottomShape = useDerivedValue(() => {
		const animatedZero =
			translateY.value < navigateHight + zero
				? interpolate(
						translateY.value,
						[navigateHight + zero, zero],
						[zero, zero + navigateHight],
						Extrapolation.CLAMP,
				  )
				: zero;
		const path = Skia.Path.Make();
		// console.log("zero:", animatedZero);
		path.moveTo(0, animatedZero);
		path.lineTo(width, animatedZero);
		path.lineTo(width, navigateHight + animatedZero);
		path.lineTo(0, navigateHight + animatedZero);
		path.close();
		return path;
	}, [translateY]);
	return (
		<Canvas style={[styles.bobbleSVG(zero)]}>
			<Path color="#88B9F2" path={bubbleShape} />
			<Group layer={LiquidPaint()}>
				{/* <Group> */}
				<Path color="#88B9F2" path={navigateTopShape} />
				<Path color="#88B9F2" path={navigateBottomShape} />
				<Slime
					translateY={translateY}
					positionXPercent={0.1}
					slimeMaxWidth={60}
					zero={zero}
				/>
				<Slime
					translateY={translateY}
					positionXPercent={0.4}
					slimeMaxWidth={30}
					zero={zero}
				/>
				{/* <Slime
					translateY={translateY}
					positionXPercent={0.5}
					slimeMaxWidth={200}
					zero={zero}
				/> */}
				<Slime
					translateY={translateY}
					positionXPercent={0.9}
					slimeMaxWidth={60}
					zero={zero}
				/>
			</Group>
		</Canvas>
	);
}

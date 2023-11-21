import { useRef, useCallback } from "react";
import { Dimensions } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Path, Skia } from "@shopify/react-native-skia";
// styles
import { MAGIC_NUM, navigateHight, stateZeroPaddingBottom } from "../../styles";
import useTheme from "../../../../hook/useTheme";
// utils
import { vec2 } from "../../../../utils/pathPoints";
import interpolateBubbleShift from "../../utils/interpolateBubbleShift";
import clamp from "../../../../utils/clamp";

const { width } = Dimensions.get("window");

export default function ({ translateY, zero, inputRange, collapseOpen }) {
	const COLORS = useTheme();
	// radius shared values
	const R = useRef(useSharedValue(1)).current;
	// bubble shapes
	const bubblePath = useCallback((pathHeight, translateY) => {
		"worklet";
		const _bubbleShift = interpolateBubbleShift(
			pathHeight,
			inputRange.value,
		);
		const animatedZero =
			-clamp(
				translateY.value,
				-navigateHight,
				_bubbleShift - stateZeroPaddingBottom,
			) + zero;
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
	}, []);
	const startShape = useDerivedValue(
		() => bubblePath(inputRange.value[0], translateY),
		[translateY],
	);
	const endShape = useDerivedValue(
		() => bubblePath(inputRange.value[1], translateY),
		[translateY],
	);
	const bubbleShape = useDerivedValue(() => {
		return endShape.value.interpolate(startShape.value, collapseOpen.value);
	}, [collapseOpen]);
	return <Path color={COLORS.primary} path={bubbleShape} />;
}

import { useRef } from "react";
import { Dimensions } from "react-native";
import {
	interpolate,
	useDerivedValue,
	useSharedValue,
	Extrapolation,
} from "react-native-reanimated";
import { Path, Skia, Rect } from "@shopify/react-native-skia";
// styles
import { MAGIC_NUM, navigateHight } from "../../styles";
// hook
// utils
import { vec2 } from "../../../../utils/pathPoints";
import interpolateBubbleShift from "../../utils/interpolateBubbleShift";

const { width } = Dimensions.get("window");

export default function ({ translateY, zero, inputRange, collapseOpen }) {
	// radius shared values
	const R = useRef(useSharedValue(1)).current;
	// bubble shapes
	const bubblePath = (pathHeight, translateY) => {
		"worklet";
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
		const endPoint = vec2(0, pathHeight + animatedZero);
		path.moveTo(0, animatedZero);
		path.lineTo(width, animatedZero);
		path.lineTo(width, pathHeight + animatedZero);
		path.lineTo(endPoint.x, endPoint.y);
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
	return (
		<Rect
			color="#88B9F2"
			x={0}
			y={0}
			width={width}
			height={inputRange[0]}
		/>
	);
}

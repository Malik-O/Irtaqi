import { useEffect, useRef } from "react";
import { Text, Dimensions, View } from "react-native";
import Animated, {
	useSharedValue,
	useDerivedValue,
	withSpring,
	useAnimatedProps,
	runOnJS,
} from "react-native-reanimated";
// components
import CardShape from "./CardShape";
import SliderBall from "./SliderBall";
import { Path } from "react-native-svg";
import * as Haptics from "expo-haptics";
// styles
import {
	paddingHorizontal,
	HEIGHT,
	WIDTH,
	width,
	BALL_SIZES,
	WAVE_RADIUS,
	cardRadius,
} from "./styles";

//
function vec2(x, y) {
	"worklet";
	return { x, y };
}
function curve(c1, c2, to) {
	"worklet";
	return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}

export default function ({ children, percent, onChange }) {
	const isActive = useRef(useSharedValue(false)).current;
	const trimValue = useRef(useSharedValue(0)).current;
	const animatedPercent = percent;
	const R = useRef(useSharedValue(30)).current;
	const translateX = useRef(useSharedValue(0)).current;
	const ballSize = useRef(useSharedValue(BALL_SIZES.SMALL)).current;
	useEffect(() => {
		animatedPercent.value = percent.value;
		translateX.value = percent.value * WIDTH - ballSize.value;
	}, []);
	// when changing from outside
	// useDerivedValue(() => {
	// 	if (animatedPercent.value !== percent.value) {
	// 		console.log(
	// 			"animatedPercent:",
	// 			animatedPercent.value,
	// 			percent.value,
	// 		);
	// 		animatedPercent.value = percent.value;
	// 	}
	// }, [percent]);
	// vibrate when touch
	useDerivedValue(() => {
		if (isActive.value)
			runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
		else
			runOnJS(Haptics.notificationAsync)(
				Haptics.NotificationFeedbackType.Success,
			);
	}, [isActive]);
	// calculate path points
	const pathValues = useDerivedValue(() => {
		// console.log("pathValues:");
		const outObj = {};
		R.value = isActive.value
			? withSpring(WAVE_RADIUS.LARGE)
			: withSpring(WAVE_RADIUS.SMALL);
		// radius driven values
		const C = R.value * 0.5522847498;
		const stepX = R.value;
		const stepY = R.value / 2;
		// point
		outObj.p1 = vec2(WIDTH * animatedPercent.value + 2 * stepX, HEIGHT);
		outObj.p2 = vec2(outObj.p1.x - stepX, outObj.p1.y - stepY);
		outObj.p3 = vec2(outObj.p2.x - stepX, outObj.p2.y - stepY);
		outObj.p4 = vec2(outObj.p3.x - stepX, outObj.p3.y + stepY);
		outObj.p5 = vec2(outObj.p4.x - stepX, outObj.p4.y + stepY);
		// curve
		outObj.c21 = vec2(outObj.p1.x - C, outObj.p1.y);
		outObj.c22 = vec2(outObj.p2.x, outObj.p2.y);

		outObj.c31 = vec2(outObj.p2.x, outObj.p2.y);
		outObj.c32 = vec2(outObj.p3.x + C, outObj.p3.y);

		outObj.c41 = vec2(outObj.p3.x - C, outObj.p3.y);
		outObj.c42 = vec2(outObj.p4.x, outObj.p4.y);

		outObj.c51 = vec2(outObj.p4.x, outObj.p4.y);
		outObj.c52 = vec2(outObj.p5.x + C, outObj.p5.y);
		return outObj;
	}, []);
	// calculate path points
	const path = useDerivedValue(() => {
		const point = pathValues.value;
		const d = [
			`M 0 0`,
			`H ${width}`,
			`V ${HEIGHT}`,
			`H ${point.p1.x}`,
			`V ${point.p1.y}`,
			curve(point.c21, point.c22, point.p2),
			curve(point.c31, point.c32, point.p3),
			curve(point.c41, point.c42, point.p4),
			curve(point.c51, point.c52, point.p5),
			// `L ${p2.x} ${p2.y}`,
			// `L ${p3.x} ${p3.y}`,
			// `L ${p4.x} ${p4.y}`,
			// `L ${width}`,
			`V ${HEIGHT}`,
			"H 0",
			"Z",
		];
		return d.join(" ");
	}, [animatedPercent]);
	// progress stroke path prop
	const strokePath = useDerivedValue(() => {
		// point
		const my = width - paddingHorizontal - cardRadius / 4;
		const point = pathValues.value;
		trimValue.value = point.p1.x - my;
		const d = [
			`M ${my} ${point.p1.y}`,
			`H ${point.p1.x}`,
			curve(point.c21, point.c22, point.p2),
			curve(point.c31, point.c32, point.p3),
		];
		return d.join(" ");
	}, [animatedPercent]);
	// animated path prop
	const animatedProps = useAnimatedProps(() => ({ d: path.value }), []);
	const animatedPropsStroke = useAnimatedProps(
		() => ({
			d: strokePath.value,
			strokeDashoffset:
				Math.min(-trimValue.value * 2, 0) - cardRadius / 4,
		}),
		[],
	);
	return (
		<View>
			<CardShape
				animatedProps={animatedProps}
				animatedPropsStroke={animatedPropsStroke}
				trimValue={trimValue.value}
			>
				{children}
			</CardShape>
			<SliderBall
				animatedPercent={animatedPercent}
				translateX={translateX}
				onChange={onChange}
				isActive={isActive}
				ballSize={ballSize.value}
			/>
		</View>
	);
}

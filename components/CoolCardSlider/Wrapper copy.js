import { useEffect, useRef } from "react";
import { Text, Dimensions, SafeAreaView } from "react-native";
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

//
function vec2(x, y) {
	"worklet";
	return { x, y };
}
function curve(c1, c2, to) {
	"worklet";
	return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}
const HEIGHT = 200;
const paddingHorizontal = 20;
const { width } = Dimensions.get("window");
const WIDTH = width - paddingHorizontal * 2;

const BALL_SIZES = { SMALL: 40, LARGE: 60 };

export default function ({ children, percent, onChange }) {
	const isActive = useRef(useSharedValue(false)).current;
	const animatedPercent = useRef(useSharedValue(0)).current;
	const R = useRef(useSharedValue(30)).current;
	const translateX = useRef(useSharedValue(0)).current;
	const ballSize = useRef(useSharedValue(BALL_SIZES.SMALL)).current;
	useEffect(() => {
		animatedPercent.value = percent;
		translateX.value = percent * WIDTH - ballSize.value;
	}, []);
	// vibrate when touch
	let prevState = isActive.value;
	useDerivedValue(() => {
		// if (isActive.value === prevState) return;
		if (isActive.value) {
			// ballSize.value = BALL_SIZES.LARGE;
			runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
		} else {
			// ballSize.value = BALL_SIZES.SMALL;
			runOnJS(Haptics.notificationAsync)(
				Haptics.NotificationFeedbackType.Success,
			);
		}
	}, [isActive]);
	// calculate path points
	const path = useDerivedValue(() => {
		R.value = isActive.value ? withSpring(70) : withSpring(40);
		// radius driven values
		const C = R.value * 0.5522847498;
		const stepX = R.value;
		const stepY = R.value / 2;
		// point
		const p1 = vec2(WIDTH * animatedPercent.value + 2 * stepX, HEIGHT);
		const p2 = vec2(p1.x - stepX, p1.y - stepY);
		const p3 = vec2(p2.x - stepX, p2.y - stepY);
		const p4 = vec2(p3.x - stepX, p3.y + stepY);
		const p5 = vec2(p4.x - stepX, p4.y + stepY);
		// curve
		const c21 = vec2(p1.x - C, p1.y);
		const c22 = vec2(p2.x, p2.y);

		const c31 = vec2(p2.x, p2.y);
		const c32 = vec2(p3.x + C, p3.y);

		const c41 = vec2(p3.x - C, p3.y);
		const c42 = vec2(p4.x, p4.y);

		const c51 = vec2(p4.x, p4.y);
		const c52 = vec2(p5.x + C, p5.y);
		const d = [
			`M 0 0`,
			`H ${width}`,
			`V ${HEIGHT}`,
			`H ${p1.x}`,
			`V ${p1.y}`,
			curve(c21, c22, p2),
			curve(c31, c32, p3),
			curve(c41, c42, p4),
			curve(c51, c52, p5),
			// `L ${p2.x} ${p2.y}`,
			// `L ${p3.x} ${p3.y}`,
			// `L ${p4.x} ${p4.y}`,
			// `L ${width}`,
			`V ${HEIGHT}`,
			"H 0",
			"Z",
		];
		return d.join(" ");
	}, [isActive, R, animatedPercent]);
	const strokePath = useDerivedValue(() => {
		R.value = isActive.value ? withSpring(70) : withSpring(40);
		// radius driven values
		const C = R.value * 0.5522847498;
		const stepX = R.value;
		const stepY = R.value / 2;
		// point
		const p1 = vec2(WIDTH * animatedPercent.value + 2 * stepX, HEIGHT);
		const p2 = vec2(p1.x - stepX, p1.y - stepY);
		const p3 = vec2(p2.x - stepX, p2.y - stepY);
		const p4 = vec2(p3.x - stepX, p3.y + stepY);
		const p5 = vec2(p4.x - stepX, p4.y + stepY);
		// curve
		const c21 = vec2(p1.x - C, p1.y);
		const c22 = vec2(p2.x, p2.y);

		const c31 = vec2(p2.x, p2.y);
		const c32 = vec2(p3.x + C, p3.y);

		const c41 = vec2(p3.x - C, p3.y);
		const c42 = vec2(p4.x, p4.y);

		const c51 = vec2(p4.x, p4.y);
		const c52 = vec2(p5.x + C, p5.y);

		const radius = 20;
		const d = [
			`M ${paddingHorizontal + radius} ${paddingHorizontal / 2}`,
			`H ${width - paddingHorizontal - radius}`,
			`a${radius},${radius} 0 0 1 20,${radius}`,
			`V ${HEIGHT - radius}`,
			`a${radius},${radius} 0 0 1 -20,${radius}`,
			`H ${p1.x}`,
			`V ${p1.y}`,
			curve(c21, c22, p2),
			curve(c31, c32, p3),
			curve(c41, c42, p4),
			curve(c51, c52, p5),
			// `L ${p2.x} ${p2.y}`,
			// `L ${p3.x} ${p3.y}`,
			// `L ${p4.x} ${p4.y}`,
			// `L ${width}`,
			`V ${HEIGHT}`,
			`H ${paddingHorizontal + radius}`,
			`a${radius},${radius} 0 0 1 -20,-${radius}`,
			`V ${paddingHorizontal / 2 + radius}`,
			`a${radius},${radius} 0 0 1 20,-${radius}`,
			// "Z",
		];
		return d.join(" ");
	}, [isActive, R, animatedPercent]);
	// animated path prop
	const animatedProps = useAnimatedProps(() => ({ d: path.value }), []);
	const animatedPropsStroke = useAnimatedProps(
		() => ({ d: strokePath.value }),
		[],
	);
	return (
		<SafeAreaView>
			<CardShape
				animatedProps={animatedProps}
				animatedPropsStroke={animatedPropsStroke}
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
			<Text style={{ fontSize: 50, marginTop: 30 }}>Under Card</Text>
		</SafeAreaView>
	);
}

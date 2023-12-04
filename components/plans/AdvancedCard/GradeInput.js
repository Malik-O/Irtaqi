import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// redux
import { useSelector } from "react-redux";
// hook
import useTranslate from "../../../hook/useTranslate";
import useStars from "../../../hook/useStars";
// components
import MaskedView from "@react-native-masked-view/masked-view";
import StarsCanvas from "./StarsCanvas";

export default function ({
	onchangeEvent,
	amountDone,
	grade: [grade, setGrade],
	allVerses,
	supportHalf,
}) {
	const { containerDim, stars } = useStars();
	// const [ratingValue, setRatingValue] = useState(grade);
	// redux
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// stars steps
	const startsCount = (supportHalf ? 2 : 1) * stars.length;
	const clampArr = Array(startsCount + 1)
		.fill()
		.map((_, i) => (i * 100) / startsCount);
	// get full width of stars
	const containerWidth = useRef(useSharedValue(0)).current;
	const onLayout = (event) => {
		if (containerWidth.value !== event.nativeEvent.layout.width)
			containerWidth.value = event.nativeEvent.layout.width;
	};
	// animated mask style
	const starMaskLengthPercent = useRef(useSharedValue(0)).current;
	useEffect(() => {
		starMaskLengthPercent.value = (100 * (grade || 0)) / stars.length;
	}, [grade]);
	const maskWidth = useAnimatedStyle(() => ({
		width: starMaskLengthPercent.value + "%",
	}));
	// calculate percent from x value
	function getMaskedLength(x) {
		"worklet";
		if (x > containerWidth.value) return 0;
		else if (isRTL) return 100 * (1 - x / containerWidth.value);
		else return (100 * x) / containerWidth.value;
	}
	// tap event
	const tapped = useRef(useSharedValue(false)).current;
	const tap = Gesture.Tap().onStart(() => {
		tapped.value = true;
	});
	// pan event
	const pan = Gesture.Pan()
		.onTouchesDown((event) => {
			starMaskLengthPercent.value = getMaskedLength(
				event.allTouches[0].x,
			);
		})
		.onChange((event) => {
			starMaskLengthPercent.value = getMaskedLength(event.x);
		})
		.onFinalize((event) => {
			const percent = getMaskedLength(event.x + 15);
			let closestStarPercent;
			if (tapped.value) {
				closestStarPercent = clampArr.filter(
					(val) => percent <= val,
				)[0];
				tapped.value = false;
			} else {
				closestStarPercent = clampArr.reduce((prev, curr) => {
					return Math.abs(curr - percent) < Math.abs(prev - percent)
						? curr
						: prev;
				});
			}
			// change value
			const gradeNewValue = (closestStarPercent * stars.length) / 100;
			runOnJS(setGrade)(gradeNewValue);
			starMaskLengthPercent.value = withTiming(closestStarPercent);
			runOnJS(onchangeEvent)(null, gradeNewValue);
		});
	// console.log("amountDone:", amountDone, allVerses.length);
	if (amountDone !== allVerses.length) return;
	return (
		<View>
			{/* <ScreenText variant="bodyLarge">
				{translate("grade")}: {ratingValue} /5
			</ScreenText> */}
			<View
				style={{ alignSelf: "center", paddingHorizontal: 15 }}
				onLayout={onLayout}
			>
				<GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
					<Animated.View>
						<StarsCanvas />
						<MaskedView
							style={{ ...containerDim() }}
							maskElement={<StarsCanvas />}
						>
							<Animated.View
								style={[
									maskWidth,
									{
										height: containerDim().height,
										backgroundColor: "yellow",
									},
								]}
							/>
						</MaskedView>
					</Animated.View>
				</GestureDetector>
			</View>
		</View>
	);
}

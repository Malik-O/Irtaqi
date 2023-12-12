import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Dimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
	useDerivedValue,
	runOnJS,
	useSharedValue,
} from "react-native-reanimated";
// component
import Avatar from "../Avatar";
import ScreenText from "../../components/ScreenText";
// hooks
import useTheme from "../../hook/useTheme";
import useSelectedStudent from "../../hook/useSelectedStudent";
// style
import { navigateHight } from "./styles";
import { paddingHorizontal } from "../../styles/layout";

let { width } = Dimensions.get("screen");
const itemWidth = width * 0.5;
const maxDragLimit = 4;

function useDragInterpolate() {
	const draggingLength = width * 0.5;
	let ranges = [
		[0, draggingLength],
		[0, itemWidth * maxDragLimit],
	];
	return (translateX, reverse) => {
		"worklet";
		if (reverse) ranges.reverse();
		return interpolate(translateX, ...ranges, Extrapolation.CLAMP);
	};
}
export default function ({
	translateY,
	translateX,
	onRefresh,
	navigationData,
}) {
	navigationData = [...navigationData, ...navigationData];
	const [selectedIndex, setSelectedIndex] = useState(0);
	const theme = useTheme();
	// selectedStudent
	const selectedStudent = useSelectedStudent();
	// console.log("navigationData:", navigationData, selectedStudent);
	const dragInterpolate = useDragInterpolate();
	useEffect(() => {
		console.log("selectedIndex:", selectedIndex);
	}, [selectedIndex]);
	//
	const length = (navigationData.length + 2) * 2;
	useDerivedValue(() => {
		const dragRatio =
			(dragInterpolate(translateX.value) * 2) / (itemWidth * length);
		let newIndex = Math.round(dragRatio * length);
		newIndex = (newIndex - (newIndex % 2)) / 2;
		runOnJS(setSelectedIndex)(newIndex);
	}, [translateX]);
	// animated styles
	const indicatorStyle = useAnimatedStyle(() => {
		const interpolatedValue = interpolate(
			translateY.value,
			[-navigateHight / 2, -navigateHight],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ scale: interpolatedValue }],
			opacity: interpolatedValue,
		};
	});
	const scrollStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: dragInterpolate(translateX.value) }],
	}));
	if (onRefresh)
		return (
			<Animated.View style={indicatorStyle}>
				<ActivityIndicator
					animating={true}
					hidesWhenStopped={false}
					size="large"
					color={theme.primary}
				/>
			</Animated.View>
		);
	return (
		<Animated.View
			style={[
				scrollStyle,
				{
					// backgroundColor: "red",
					// wid th,
					flexDirection: "row",
					paddingHorizontal: itemWidth,
					position: "absolute",
					left: 0,
				},
			]}
		>
			{navigationData.map((item, index) => (
				<View
					style={{
						alignItems: "center",
						flexDirection: "column",
						gap: paddingHorizontal,
						// backgroundColor: "red",
						width: itemWidth,
					}}
					key={index}
				>
					<ScreenText
						variant="headlineSmall"
						style={{
							backgroundColor:
								index === selectedIndex ? "red" : null,
						}}
					>
						{item.first_name}
						{index} |||
						{selectedIndex}
					</ScreenText>
					<Avatar size={40} />
				</View>
			))}
		</Animated.View>
	);
}

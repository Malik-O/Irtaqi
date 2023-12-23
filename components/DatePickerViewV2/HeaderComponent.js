import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import GlobalDatePicker from "../../components/GlobalDatePicker";
// styles
import styles, { navigateHight } from "./styles";
// utils
import clamp from "../../utils/clamp";
// Components
import Canvas from "./Canvas";
import NavigationHeader from "./NavigationHeader";
// hook
import useZero from "../../hook/useZero";

export default function ({
	hasNavigationHeader,
	CalendarHight,
	translateY,
	collapseOpen,
	inputRange,
	navigationData,
}) {
	// calc zero
	const zero = useZero();
	// animated style
	const datePickerStyle = useAnimatedStyle(() => {
		const transformTranslateY = clamp(translateY.value, -navigateHight, 0);
		return { transform: [{ translateY: -transformTranslateY }] };
	}, [translateY]);
	// animated styles
	return (
		<View
			style={styles.scrollHeader(zero)}
			// onLayout={(event) => {
			// 	if (
			// 		CalendarHight.value.height !==
			// 		event.nativeEvent.layout.height
			// 	) {
			// 		if (collapseOpen.value % 1)
			// 			CalendarHight.value = event.nativeEvent.layout.height;
			// 		else
			// 			CalendarHight.value = withTiming(
			// 				event.nativeEvent.layout.height,
			// 			);
			// 	}
			// }}
		>
			{/* <NavigationHeader
				hasNavigationHeader={hasNavigationHeader}
				translateY={translateY}
				navigationData={navigationData}
			/>
			<Animated.View style={datePickerStyle}>
				<GlobalDatePicker collapseOpen={collapseOpen} />
			</Animated.View> */}
			<Canvas
				translateY={translateY}
				collapseOpen={collapseOpen}
				inputRange={inputRange}
			/>
		</View>
	);
}

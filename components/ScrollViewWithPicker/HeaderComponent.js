import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import GlobalDatePicker from "../../components/GlobalDatePicker";
// redux
import { useSelector } from "react-redux";
// styles
import styles, { navigateHight } from "./styles";
// utils
import clamp from "../../utils/clamp";
// Components
import Canvas from "./Canvas";
import NavigationHeader from "./NavigationHeader";

export default function ({
	hasNavigationHeader,
	CalendarDim,
	translateY,
	collapseOpen,
	inputRange,
	navigationData,
}) {
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	// calc zero
	const insets = useSafeAreaInsets();
	const zero = insets.top + StatusBar.currentHeight;
	// animated style
	const datePickerStyle = useAnimatedStyle(() => {
		const transformTranslateY = clamp(translateY.value, -navigateHight, 0);
		return { transform: [{ translateY: -transformTranslateY }] };
	}, [translateY]);
	// animated styles
	return (
		<View
			style={styles.scrollHeader(zero)}
			onLayout={(event) => (CalendarDim.value = event.nativeEvent.layout)}
		>
			<NavigationHeader
				hasNavigationHeader={hasNavigationHeader}
				translateY={translateY}
				navigationData={navigationData}
			/>
			<Animated.View style={datePickerStyle}>
				<GlobalDatePicker collapseOpen={collapseOpen} />
			</Animated.View>
			<Canvas
				translateY={translateY}
				collapseOpen={collapseOpen}
				inputRange={inputRange}
				zero={zero}
			/>
		</View>
	);
}

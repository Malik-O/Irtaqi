import { useState } from "react";
import { useColorScheme } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// styles
import styles from "./styles";

export default function ({ activeIndex, i }) {
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// color scheme
	const colorScheme = useColorScheme();
	const rgb = colorScheme === "light" ? "0, 0, 0" : "255, 255, 255";
	//
	const [width, setWidth] = useState(0);
	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: (width / 2) * (-1) ** !isRTL },
			{ scaleX: i <= activeIndex ? withTiming(1) : withTiming(0) },
			{ translateX: (-width / 2) * (-1) ** !isRTL },
		],
	}));
	return (
		<Animated.View
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
			style={styles.dashBG(rgb)}
		>
			<Animated.View style={[style, styles.dashOverlay(rgb)]} />
		</Animated.View>
	);
}

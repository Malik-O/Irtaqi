import { memo, useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
// components
import ScreenText from "./ScreenText";
// styles
import styles from "../styles/layout";
import useTheme from "../hook/useTheme";

export default memo(function ({
	item: { id, title } = {},
	href,
	children,
	style,
	onPress,
}) {
	// console.log("title:");
	const theme = useTheme();
	// router
	const router = useRouter();
	const onPressEvent =
		onPress ||
		useCallback(() => {
			router.push(href);
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}, []);
	const cardStyle = [styles.planCardContainer(theme.cardColor), style];

	return (
		<TouchableOpacity disabled={!onPress && !href} onPress={onPressEvent}>
			<View style={cardStyle}>
				{title ? (
					<ScreenText variant="bodyLarge">{title}</ScreenText>
				) : (
					children
				)}
			</View>
		</TouchableOpacity>
	);
});

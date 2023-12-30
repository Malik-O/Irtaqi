import { memo, useState, useEffect } from "react";
import {
	View,
	useColorScheme,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
// styles
import styles from "../styles/layout";
// components
import Snackbar from "./notifications/Snackbar";
//
import useTheme from "../hook/useTheme";

function ScrollViewExists({
	condition,
	scrollEnabled,
	scrollViewRef,
	children,
}) {
	if (condition)
		return (
			<ScrollView scrollEnabled={scrollEnabled} ref={scrollViewRef}>
				{children}
			</ScrollView>
		);
	else return children;
}
function IsExists({ value, children }) {
	if (value) return children;
	else return null;
}

export default memo(function ({
	children,
	hasScrollView = true,
	paddingTop = true,
	style,
	scrollEnabled = true,
	scrollViewRef,
	hasLoading = false,
}) {
	const theme = useTheme();
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	// loading style
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isLoading) setIsLoading(true);
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<View style={[StyleSheet.absoluteFill, { flex: 1 }]}>
			<Snackbar />
			<View
				style={[
					styles.screenView(colorScheme),
					{
						paddingTop: paddingTop ? insets.top : 0,
						paddingBottom: insets.bottom,
						backgroundColor: theme.tertiary,
					},
					style,
				]}
			>
				<ScrollViewExists
					condition={hasScrollView}
					scrollEnabled={scrollEnabled}
					scrollViewRef={scrollViewRef}
				>
					<IsExists value={!isLoading}>{children}</IsExists>
					<IsExists value={isLoading}>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<ActivityIndicator />
						</View>
					</IsExists>
				</ScrollViewExists>
			</View>
		</View>
	);
});

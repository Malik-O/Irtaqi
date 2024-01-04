import { useRef, useMemo, useCallback } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useRouter, usePathname } from "expo-router";
// redux
import { useSelector } from "react-redux";
// hook
import useTranslate from "../../hook/useTranslate";
import usePlanInstanceString from "../../hook/plans/usePlanInstanceString";
// components
import {
	Button,
	Dialog,
	Portal,
	PaperProvider,
	Text,
} from "react-native-paper";
import ScreenText from "../ScreenText";

let timeout;

function index({ plan, openSheet, selectedPlan }) {
	const pathname = usePathname();
	const router = useRouter();
	const translate = useTranslate();
	const getPlanCardString = usePlanInstanceString();
	const isDetailsLoading = useSharedValue(false);
	const onPress = useCallback(() => {
		// router.push(`${pathname}/${plan.id}`);
		openSheet(plan);
		//
		clearTimeout(timeout);
		isDetailsLoading.value = true;
		setTimeout(() => {
			isDetailsLoading.value = false;
		}, 1000);
	}, []);
	// loading
	// const loadingActive =isDetailsLoading.value&& selectedPlan.id === plan.id;
	const contentStyle = useAnimatedStyle(
		() => ({ display: isDetailsLoading.value ? "none" : "flex" }),
		[],
	);
	const indicatorStyle = useAnimatedStyle(
		() => ({ display: isDetailsLoading.value ? "flex" : "none" }),
		[],
	);
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<Animated.View style={styles.planCardContainer(plan.color)}>
					<Animated.View>
						{/* title */}
						<ScreenText variant="bodyLarge" textOverflow>
							{translate(plan.title)}
						</ScreenText>
						{/* today planed */}
						<Animated.View style={contentStyle}>
							<ScreenText>{getPlanCardString(plan)}</ScreenText>
						</Animated.View>
						{/* indicator */}
						<Animated.View style={indicatorStyle}>
							<ActivityIndicator color="white" />
						</Animated.View>
					</Animated.View>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
}

index.whyDidYouRender = {
	logOnDifferentValues: true,
};
export default index;
const styles = StyleSheet.create({
	planCardContainer: (planColor) => ({
		width: 200,
		margin: 20,
		backgroundColor: "#009688" || planColor,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
	}),
});

import { useRef, useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
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
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const config = { duration: 200 };
function index({ plan, openSheet }) {
	const pathname = usePathname();
	const router = useRouter();
	const translate = useTranslate();
	const getPlanCardString = usePlanInstanceString();
	const onPress = useCallback(() => {
		// router.push(`${pathname}/${plan.id}`);
		openSheet(plan);
	}, []);
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<View style={[styles.planCardContainer(plan.color)]}>
					<ScreenText variant="bodyLarge">
						{translate(plan.title)}
					</ScreenText>
					<ScreenText>{getPlanCardString(plan)}</ScreenText>
				</View>
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

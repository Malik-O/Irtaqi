import { useMemo, useRef, useState, useEffect, memo } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// components
import {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import Background from "./Background";
import ScreenText from "../ScreenText";
import Card from "../Card";
import Handle from "./Handle";
// hooks
import usePlanInstanceString from "../../hook/plans/usePlanInstanceString";
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
import calcNotificationTime from "../../utils/calcNotificationTime";
// styles
import { paddingHorizontal } from "../../styles/layout";

function PlanInstance({ instance, selectedPlan }) {
	const theme = useTheme();
	const translate = useTranslate();
	const getPlanCardString = usePlanInstanceString();
	//
	const planCardString = getPlanCardString({
		...selectedPlan,
		day: [instance],
	});
	// date format
	const date = useMemo(() => new Date(+instance.date), []);
	const dateStr = useMemo(() =>
		new Intl.DateTimeFormat("en-GB").format(date),
	);
	const [day, month, year] = dateStr.split("/");
	const monthName = translate("monthNamesShort")[month - 1];
	const weekDay = translate("weekDays")[date.getDay()];
	return (
		<View>
			<View
				style={{
					alignItems: "center",
					flexDirection: "row",
					gap: paddingHorizontal,
					marginTop: 10,
				}}
			>
				<Animated.View
					style={{
						width: 60,
						height: 70,
						borderRadius: 10,
						backgroundColor: theme.tertiary,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ScreenText
						variant="titleLarge"
						style={{ fontWeight: "bold" }}
					>
						{+day}
					</ScreenText>
					<ScreenText variant="bodySmall" style={{ opacity: 0.7 }}>
						{monthName}
					</ScreenText>
				</Animated.View>
				<View style={{ flexDirection: "column" }}>
					<ScreenText variant="headlineSmall">{weekDay}</ScreenText>
					<ScreenText variant="titleSmall">
						{calcNotificationTime(date)}
					</ScreenText>
				</View>
			</View>
			<Card
				variant="bodyMedium"
				style={{ color: theme.reverse.secondary }}
				item={{ title: planCardString }}
			/>
		</View>
	);
}

function index({ sheetRef, selectedPlan, isLoading }) {
	const snapPoints = useMemo(() => ["50%", "90%"], []);
	// Bottom Sheet style
	const contentStyle = useAnimatedStyle(
		() => ({ display: isLoading.value ? "none" : "flex" }),
		[],
	);
	const indicatorStyle = useAnimatedStyle(
		() => ({ display: isLoading.value ? "flex" : "none" }),
		[],
	);

	return (
		<BottomSheetModal
			ref={sheetRef}
			snapPoints={snapPoints}
			onChange={() => {}}
			backgroundStyle={{
				backgroundColor: "#009688" || selectedPlan.color,
			}}
			backgroundComponent={Background}
			handleComponent={(params) => Handle({ selectedPlan, ...params })}
		>
			<BottomSheetScrollView>
				<Animated.View
					style={[
						{ paddingHorizontal: paddingHorizontal },
						contentStyle,
					]}
				>
					{/* <ScreenText
						variant="headlineMedium"
						style={{ marginBottom: 20 }}
					>
						{selectedPlan.title}
					</ScreenText> */}
					{selectedPlan?.Plans_instances?.map((instance, i) => (
						<PlanInstance
							instance={instance}
							selectedPlan={selectedPlan}
							key={i}
						/>
					))}
				</Animated.View>
				<Animated.View style={indicatorStyle}>
					<ActivityIndicator />
				</Animated.View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}
export default memo(index);
import "../../wdyr";
import React, { useCallback, useRef, useMemo } from "react";
import Animated, {
	SlideInUp,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../store/globalDate";
// components
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Agenda, LocaleConfig } from "../Calendar";
import ScreenText from "../ScreenText";
const AnimatedAgenda = Animated.createAnimatedComponent(Agenda);
// hook
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
// utils
import extractISODate from "../../utils/extractISODate";

let timeout;

export default function ({ children }) {
	const theme = useTheme();
	// redux
	const dispatch = useDispatch();
	const { globalDate } = useSelector((state) => state.globalDate);
	// agenda ar language
	LocaleConfig.locales["ar"] = {
		monthNames: [
			"يناير",
			"فبراير",
			"مارس",
			"ابريل",
			"مايو",
			"يونيو",
			"يوليو",
			"اغسطس",
			"سبتمبر",
			"اكتوبر",
			"نوفمبر",
			"ديسمبر",
		],
		monthNamesShort: [
			"يناير",
			"فبراير",
			"مارس",
			"ابريل",
			"مايو",
			"يونيو",
			"يوليو",
			"اغسطس",
			"سبتمبر",
			"اكتوبر",
			"نوفمبر",
			"ديسمبر",
		],
		dayNames: [
			"السبت",
			"الاحد",
			"الاثنين",
			"الثلاثاء",
			"الاربعاء",
			"الخميس",
			"الجمعة",
		],
		dayNamesShort: [
			"سبت",
			"احد",
			"اثنين",
			"ثلاثاء",
			"اربعاء",
			"خميس",
			"جمعة",
		],
		today: "اليوم",
	};
	const { locale } = useSelector((state) => state.lang);
	LocaleConfig.defaultLocale = locale;
	// loading after pressing on date
	const isDateLoading = useSharedValue(false);
	const contentStyle = useAnimatedStyle(
		() => ({ display: isDateLoading.value ? "none" : "flex" }),
		[],
	);
	const indicatorStyle = useAnimatedStyle(
		() => ({ display: !isDateLoading.value ? "none" : "flex" }),
		[],
	);

	// render
	return (
		<>
			<View style={{ height: 100 }} />
			<AnimatedAgenda
				entering={SlideInUp.duration(1000)}
				theme={{
					selectedDayBackgroundColor: theme.primary,
					agendaKnobColor: theme.reverse.secondary,
					calendarBackground: theme.secondary,
					todayTextColor: theme.reverse.secondary,
					selectedDayTextColor: theme.reverse.secondary,
					monthTextColor: theme.reverse.secondary,
					textDisabledColor: theme.reverse.fadeSecondary,
					dayTextColor: theme.reverse.secondary,
					agendaDayNumColor: theme.reverse.secondary,
				}}
				// reservationsList={children}
				// Specify the current date
				current={extractISODate({ date: globalDate })}
				// Callback that gets called when the user selects a day
				onDayPress={(day) => {
					clearTimeout(timeout);
					isDateLoading.value = true;
					timeout = setTimeout(() => {
						isDateLoading.value = false;
						dispatch(
							globalDateActions.set(new Date(day.timestamp)),
						);
					}, 0);
				}}
				// Mark specific dates as marked
				markedDates={{
					"2023-12-23": {
						// selected: true,
						marked: true,
						// selectedColor: "blue",
					},
				}}
			/>
			<Animated.View style={contentStyle}>{children}</Animated.View>
			<Animated.View style={[indicatorStyle, { marginTop: 30 }]}>
				<ActivityIndicator />
			</Animated.View>
		</>
	);
}

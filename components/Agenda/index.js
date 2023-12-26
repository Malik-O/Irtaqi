import "../../wdyr";
import React, { useCallback, useRef, useMemo } from "react";
import Animated, { SlideInUp } from "react-native-reanimated";
import { SafeAreaView, View, Text, Button } from "react-native";
// components
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Agenda, LocaleConfig } from "../Calendar";
const AnimatedAgenda = Animated.createAnimatedComponent(Agenda);
// hook
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
// redux
import { useSelector } from "react-redux";

export default function ({ children }) {
	const theme = useTheme();
	const translate = useTranslate();
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
	//
	const { locale } = useSelector((state) => state.lang);
	LocaleConfig.defaultLocale = locale;
	// render
	return (
		<>
			<View style={{ height: 100 }} />
			<AnimatedAgenda
				entering={SlideInUp.delay(500).duration(1000)}
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
				current={"2012-03-01"}
				// Callback that gets called when the user selects a day
				onDayPress={(day) => {
					console.log("selected day", day);
				}}
				// Mark specific dates as marked
				markedDates={{
					"2023-12-23": {
						selected: true,
						marked: true,
						selectedColor: "blue",
					},
				}}
			/>
			{children}
		</>
	);
}

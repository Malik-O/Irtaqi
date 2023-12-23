import { TouchableOpacity, View, useColorScheme } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../ScreenText";
// redux
import { useSelector, useDispatch } from "react-redux";
import { globalDateActions } from "../../store/globalDate";
// utils
import capitalize from "../../utils/capitalize";
// hook
import useTranslate from "../../hook/useTranslate";
import useWeeks from "../../hook/globalDatePicker/useWeeks";

function arrowIcon(direction, isRTL) {
	const chevrons = ["chevron-forward", "chevron-back"];
	return chevrons[isRTL ? +!direction : direction];
}

export default function ({ color, entering }) {
	const colorScheme = useColorScheme();
	const dispatch = useDispatch();
	const translate = useTranslate();
	const { changeMonth } = useWeeks();
	// language support
	const { locale, rtl } = useSelector((state) => state.lang);
	const isRTL = rtl[locale];
	// animated styles
	return (
		<Animated.View
			entering={entering}
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				marginTop: 10,
			}}
		>
			<TouchableOpacity onPress={() => changeMonth(-1)}>
				<Ionicons name={arrowIcon(1, isRTL)} size={50} color={color} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					dispatch(globalDateActions.set(new Date()));
				}}
			>
				<View
					style={{
						transform: [{ scale: 0.7 }],
						color,
						marginHorizontal: 10,
						borderWidth: 1,
						borderRadius: "50%",
						paddingHorizontal: 70,
						paddingVertical: 10,
						borderColor:
							colorScheme === "dark"
								? "rgba(255, 255, 255,0.5)"
								: "rgba(0, 0, 0,0.5)",
					}}
				>
					<ScreenText variant="displaySmall">
						{translate("today", true)}
					</ScreenText>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => changeMonth(1)}>
				<Ionicons name={arrowIcon(0, isRTL)} size={50} color={color} />
			</TouchableOpacity>
		</Animated.View>
	);
}

import { TouchableOpacity } from "react-native";
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
			style={{ flexDirection: "row", alignItems: "center" }}
		>
			<TouchableOpacity onPress={() => changeMonth(-1)}>
				<Ionicons name={arrowIcon(1, isRTL)} size={30} color={color} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					dispatch(globalDateActions.set(new Date()));
				}}
			>
				<ScreenText style={{ color, marginHorizontal: 10 }}>
					{capitalize(translate("today"))}
				</ScreenText>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => changeMonth(1)}>
				<Ionicons name={arrowIcon(0, isRTL)} size={30} color={color} />
			</TouchableOpacity>
		</Animated.View>
	);
}

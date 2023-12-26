import { useCallback, useMemo } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";
// redux
import { useSelector } from "react-redux";
// Components
import Ionicons from "@expo/vector-icons/Ionicons";
// hook
import useTheme from "../hook/useTheme";
// styles
import styles from "../styles/layout";

export default function ({
	style,
	isExists = true,
	href,
	back,
	onPressEvent,
	iconName,
}) {
	const theme = useTheme();
	// lang store
	const { locale, rtl } = useSelector((state) => state.lang);
	// displayed icon
	const icon = useMemo(() => {
		if (back) return rtl[locale] ? "chevron-forward" : "chevron-back";
		else if (iconName) return iconName;
	});
	// router stuff
	const router = useRouter();
	const onPress = useCallback(function () {
		if (onPressEvent) return onPressEvent();
		if (back) router.back();
		else if (href) router.push(href);
	});
	//
	return (
		<Animated.View style={[style]}>
			<TouchableOpacity onPress={onPress}>
				{isExists ? (
					<Ionicons
						name={icon}
						size={30}
						color={theme.reverse.secondary}
					/>
				) : null}
			</TouchableOpacity>
		</Animated.View>
	);
}

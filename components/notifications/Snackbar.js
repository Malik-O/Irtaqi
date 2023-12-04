import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
	interpolate,
	useDerivedValue,
	useSharedValue,
	Extrapolation,
	useAnimatedStyle,
	withTiming,
	withDelay,
} from "react-native-reanimated";
// redux
import { useSelector, useDispatch } from "react-redux";
import { notificationsActions } from "../../store/notifications";
// components
import { Snackbar } from "react-native-paper";
import ScreenText from "../../components/ScreenText";
// hook
import useZero from "../../hook/useZero";
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
// styles
import { paddingHorizontal } from "../../styles/layout";

let timeout;
export default function ({ duration = 4000 }) {
	const translate = useTranslate();
	const zero = useZero();
	const theme = useTheme();
	// redux
	const dispatch = useDispatch();
	const { snackbar } = useSelector((state) => state.notifications);
	// dismiss
	const onDismissSnackBar = () =>
		dispatch(notificationsActions.setSnackbarVisible(false));
	useEffect(() => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			onDismissSnackBar();
		}, duration);
	}, [snackbar.visible]);
	// height
	const contentHeight = useRef(useSharedValue(0)).current;
	const onLayout = (event) => {
		if (contentHeight.value !== event.nativeEvent.layout.height)
			contentHeight.value = event.nativeEvent.layout.height;
	};
	// style
	const snackbarStyle = useAnimatedStyle(() => ({
		top: snackbar.visible
			? withTiming(0)
			: withTiming(-contentHeight.value),
	}));
	const wrapperStyle = useAnimatedStyle(() => ({
		opacity: snackbar.visible ? 1 : withDelay(300, withTiming(0)),
	}));
	return (
		<Animated.View
			pointerEvents="box-none"
			style={[StyleSheet.absoluteFill, wrapperStyle, { zIndex: 5000 }]}
		>
			<Pressable onPressIn={onDismissSnackBar} pointerEvents="auto">
				<Animated.View
					style={[
						snackbarStyle,
						{
							position: "absolute",
							width: "100%",
							paddingHorizontal,
							paddingTop: zero,
							paddingBottom: paddingHorizontal,
							backgroundColor:
								theme.reverse[snackbar.data?.type] ||
								theme.cardColor,
							position: "absolute",
						},
					]}
					onLayout={onLayout}
				>
					<ScreenText style={{ color: theme.reverse.secondary }}>
						{translate(snackbar.data?.message)}
					</ScreenText>
				</Animated.View>
			</Pressable>
		</Animated.View>
	);
}

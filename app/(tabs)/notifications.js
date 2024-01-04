import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Stack } from "expo-router";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
// hooks
import useGetNotifications from "../../hook/notifications/useGetNotifications";
import useTranslate from "../../hook/useTranslate";
import usePush from "../../hook/notifications/usePush";
import connectToNotificationStore from "../../hook/useConnectToStore/instants/connectToNotificationStore";
// redux
import { useSelector, useDispatch } from "react-redux";
import { notificationsActions } from "../../store/notifications";
// components
import ScreenView from "../../components/ScreenView";
import CoolScrollView from "../../components/CoolScrollView";
import NotificationCard from "../../components/notifications/NotificationCard";

const { height } = Dimensions.get("screen");

export default function notifications() {
	const pushNotification = usePush();
	const translate = useTranslate();
	const { isLoading, refetchGroupAttendance } = useGetNotifications();
	const { notifications } = useSelector((state) => state.notifications);
	//
	const NotificationsConnectionsInstance = connectToNotificationStore();
	useEffect(() => {
		NotificationsConnectionsInstance.get();
	}, []);

	const props = {
		title: translate("notifications"),
		back: true,
		more: false,
	};
	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: translate("notifications"),
				}}
			/>
			<ScreenView hasScrollView={false} paddingTop={false}>
				<Animated.FlatList
					style={[{ marginBottom: 80 }]}
					data={[...notifications].sort(
						(a, b) => b.createdAt - a.createdAt,
					)}
					scrollEventThrottle={16}
					keyExtractor={(_, i) => i}
					renderItem={({ item, index }) => {
						return (
							<NotificationCard notification={item} key={index} />
						);
					}}
				/>
			</ScreenView>
		</>
	);
}

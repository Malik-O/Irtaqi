import { useEffect, useState } from "react";
import { View, Button } from "react-native";
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
		<ScreenView hasScrollView={false}>
			<CoolScrollView
				props={props}
				paddingTop={false}
				onRefresh={refetchGroupAttendance}
			>
				<View>
					{[...notifications]
						.sort((a, b) => b.createdAt - a.createdAt)
						.map((notification, i) => (
							<NotificationCard
								notification={notification}
								key={i}
							/>
						))}
					<Button
						title="press"
						onPress={() =>
							pushNotification({
								message: "hello htere",
								type: "warning",
							})
						}
					/>
				</View>
			</CoolScrollView>
		</ScreenView>
	);
}

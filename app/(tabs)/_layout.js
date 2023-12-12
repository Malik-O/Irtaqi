import React from "react";
import { Tabs } from "expo-router";
import { View, Image, useColorScheme, Dimensions } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
// component
import { Path, Skia, Canvas, Group } from "@shopify/react-native-skia";
import Ionicons from "@expo/vector-icons/Ionicons";
// icons
import HomeIcon from "../../components/icons/Home";
import NotificationIcon from "../../components/icons/Notification";
import Profile from "../../components/icons/Profile";
import Groups from "../../components/icons/Groups";
//utils
import { vec2 } from "../../utils/pathPoints";
// hook
import useTheme from "../../hook/useTheme";
import useSeenAll from "../../hook/notifications/useSeenAll";
import useGetNotifications from "../../hook/notifications/useGetNotifications";
// styles
import styles, {
	tabBarBubbleShift,
	MAGIC_NUM,
	tabBarHeight,
} from "../../styles/layout";
const { width } = Dimensions.get("window");
// const height = 200;

function TabBarBG() {
	const theme = useTheme();
	const path = Skia.Path.Make();
	const R = 1;
	// calc point
	const C = R * MAGIC_NUM;
	const middlePoint = vec2(width / 2, 0);
	const endPoint = vec2(width, tabBarBubbleShift);
	const c1 = vec2(middlePoint.x - C, middlePoint.y);
	const c2 = vec2(endPoint.x, endPoint.y);
	// add points
	path.moveTo(0, tabBarBubbleShift);
	// path.cubicTo(c1.x, c1.y, c2.x, c2.y, endPoint.x, endPoint.y);
	// path.lineTo(width / 2, 0);
	// path.lineTo(width, tabBarBubbleShift);
	path.quadTo(width / 2, 0, width, tabBarBubbleShift);

	path.lineTo(width, tabBarHeight);
	path.lineTo(0, tabBarHeight);
	path.close();
	return (
		<>
			<View
				style={{
					width: 10,
					position: "absolute",
					height: 19,
					backgroundColor: "red",
				}}
			/>
			<Canvas style={styles.canvas}>
				<Path path={path} color={theme.secondary} />
			</Canvas>
		</>
	);
}
export default function () {
	const seeAll = useSeenAll();
	const colorScheme = useColorScheme();
	const { isLoading, refetchGroupAttendance, subscribe } =
		useGetNotifications();
	const { notifications } = useSelector((state) => state.notifications);
	// console.log("notifications:", notifications);
	const countUnseen = notifications?.reduce(
		(acc, notification) => acc + !notification.seen,
		0,
	);
	return (
		<Tabs
			screenOptions={{
				tabBarBackground: TabBarBG,
				// tabBarActiveTintColor: styles.tabBarActiveTintColor,
				// tabBarLabelStyle: styles.text(colorScheme),
				tabBarStyle: styles.tabBarStyle(colorScheme),
				headerStyle: styles.barBackground(colorScheme),
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarIcon: HomeIcon,
				}}
			/>
			<Tabs.Screen
				name="groups"
				options={{
					headerShown: false,
					tabBarIcon: Groups,
				}}
			/>
			<Tabs.Screen
				name="notifications"
				listeners={({ navigation, route }) => ({
					blur: (e) => {
						seeAll();
					},
				})}
				options={{
					header: () => null,
					tabBarBadge: countUnseen || null,
					tabBarIcon: NotificationIcon,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					header: () => null,
					tabBarIcon: Profile,
				}}
			/>
		</Tabs>
	);
}

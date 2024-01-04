import { useRef, useCallback, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
// components
import Card from "../Card";
import ScreenText from "../ScreenText";
import UserDetailsBottomSheet from "./UserDetailsBottomSheet";
// hook
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// utils
import fullName from "../../utils/fullName";

let timeout;
export default function ({ users, emptyMessage, openAddUserSheet }) {
	const translate = useTranslate();
	const theme = useTheme();
	// bottom sheet
	const { dismissAll } = useBottomSheetModal();
	const bottomSheetRef = useRef(null);
	// open action
	const [selectedUser, setSelectedUser] = useState({});
	const isLoading = useSharedValue(false);
	const openUserDetailsSheet = useCallback((plan) => {
		dismissAll();
		bottomSheetRef?.current?.present();
		console.log("bottomSheetRef:", bottomSheetRef?.current);
		isLoading.value = true;
		// timeout
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setSelectedUser(plan);
			isLoading.value = false;
		}, 0);
	}, []);
	// if no users
	if (users?.length)
		return (
			<View>
				<Animated.FlatList
					// style={[{ marginBottom: 80 }]}
					data={users}
					scrollEventThrottle={16}
					keyExtractor={(_, i) => i}
					renderItem={({ item, index }) => {
						return (
							<Card
								key={index}
								item={{ ...item, title: fullName(item) }}
								onPress={() => openUserDetailsSheet(item)}
							/>
						);
					}}
				/>
				<UserDetailsBottomSheet
					bottomSheetRef={bottomSheetRef}
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
					isLoading={isLoading}
				/>
			</View>
		);
	else
		return (
			<View style={{ marginTop: 20 }}>
				<ScreenText style={{ textAlign: "center" }} variant="bodyLarge">
					{emptyMessage[0]}
				</ScreenText>
				<TouchableOpacity onPress={openAddUserSheet}>
					<ScreenText
						style={{
							textAlign: "center",
							marginTop: 10,
							color: theme.reverse.primary,
						}}
						variant="bodyLarge"
					>
						{emptyMessage[1]}
					</ScreenText>
				</TouchableOpacity>
			</View>
		);
}

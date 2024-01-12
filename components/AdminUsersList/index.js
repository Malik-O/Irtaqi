import { useRef, useCallback, useState, useMemo } from "react";
import { View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
// components
import SwipeableList from "../SwipeableList";
import ScreenText from "../ScreenText";
import UserDetailsBottomSheet from "./UserDetailsBottomSheet";
// redux
import { useSelector } from "react-redux";
// hook
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
import useRemoveUser from "../../hook/user/useRemoveUser";
import useAssignToGroup from "../../hook/user/useAssignToGroup";

let timeout;
export default function ({ users, emptyMessage, openAddUserSheet }) {
	const { groupID } = useGlobalSearchParams();
	const translate = useTranslate();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const { mutationAction, loading } = useAssignToGroup();
	const transportList = useMemo(
		() =>
			groups
				.filter((group) => groupID !== group.id)
				.map(({ id, title }) => ({ id, title })),
		[],
	);
	// details bottom sheet
	const { dismissAll } = useBottomSheetModal();
	const bottomSheetRef = useRef(null);
	// open details action
	const [selectedUser, setSelectedUser] = useState({});
	const isLoading = useSharedValue(false);
	const openUserDetailsSheet = useCallback((user) => {
		dismissAll();
		bottomSheetRef?.current?.present();
		isLoading.value = true;
		// timeout
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setSelectedUser(user);
			isLoading.value = false;
		}, 0);
	}, []);
	// remove user mutation
	const { removeUser, isLoading: removeLoading } =
		useRemoveUser(bottomSheetRef);

	return (
		<View>
			<SwipeableList
				data={users}
				hasAvatar
				onPress={(user) => {
					openUserDetailsSheet(user);
				}}
				// actions
				// editAction={(plan) => () => openUserDetailsSheet(plan)}
				// remove action
				hasConfirmation
				removeActionMutation={removeUser}
				// transportation action
				transportAction={mutationAction}
				transportList={transportList}
				emptyTransportMessage={translate("emptyTransportMessage")}
				transportSheetTitle={translate("transportToGroup")}
				transportLoading={loading}
				// empty
				emptyMessage={emptyMessage}
				emptyAction={openAddUserSheet}
			/>
			<UserDetailsBottomSheet
				bottomSheetRef={bottomSheetRef}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
				isLoading={isLoading}
			/>
		</View>
	);
}

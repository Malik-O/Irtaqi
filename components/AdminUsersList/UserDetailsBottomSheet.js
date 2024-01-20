import { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
// component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheet from "../BottomSheet";
import UserFieldsContainer from "./UserFieldsContainer";
import GroupsTab from "./GroupsTab";
import Tabs from "../Tabs";
import Avatar from "../Avatar";
import ScreenText from "../ScreenText";
import UserPicAndName from "./UserPicAndName";
// hook
import useTranslate from "../../hook/useTranslate";
import useAssignToGroup from "../../hook/user/useAssignToGroup";
import useUpdateUser from "../../hook/user/useUpdateUser";
import useUserFields from "../../hook/user/useUserFields";
// style
import { paddingHorizontal } from "../../styles/layout";
// utils
import fullName from "../../utils/fullName";
import deepEqual from "../../utils/deepEqual";

export default function ({
	bottomSheetRef,
	selectedUser,
	setSelectedUser,
	selectedUserFrom,
	setSelectedUserFrom,
	isLoading,
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const translate = useTranslate();
	// callbacks
	const snapPoints = useMemo(() => ["70%", "90%"], []);
	const handleSheetChanges = useCallback((index) => {
		if (index === -1) {
			setSelectedUser({});
			setChangeableRoles([]);
		}
	}, []);
	// get user groups
	const fields = useUserFields();
	// tabs
	const tabs = useMemo(() => [
		{
			title: translate("personalInfo"),
			ele: () => (
				<UserFieldsContainer
					fields={fields}
					bottomSheetRef={bottomSheetRef}
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
					selectedUserFrom={selectedUserFrom}
					setSelectedUserFrom={setSelectedUserFrom}
				/>
			),
		},
		{
			title: translate("groups"),
			ele: (params) => GroupsTab(selectedUser, params),
		},
	]);
	// big button
	const compareList = useMemo(
		() => fields.editable.map((field) => field.label),
		[],
	);
	// update user
	const isUserDataChanged = useMemo(
		() => !deepEqual(selectedUser, selectedUserFrom, compareList),
		[selectedUser, selectedUserFrom],
	);
	const { mutationAction: updateUserData } = useUpdateUser(
		selectedUserFrom,
		bottomSheetRef,
	);
	// update user role
	const [changeableRoles, setChangeableRoles] = useState([]);
	const { mutationAction: updateRole, loading: roleLoading } =
		useAssignToGroup(false, true);
	// renders
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			enableDismissOnClose
			defaultBackDrop
			// big button
			bigButtonTitle={
				(isUserDataChanged || changeableRoles?.length) &&
				translate("saveChanges")
			}
			bigButtonOnPress={async () => {
				console.log("pushded:", isUserDataChanged);
				// requests list
				let req = [];
				if (isUserDataChanged)
					req = req.concat(
						isUserDataChanged && (await updateUserData()),
					);
				if (changeableRoles?.length) {
					req = req.concat(
						changeableRoles.map(
							async (role) =>
								await updateRole(
									selectedUser,
									role,
									bottomSheetRef,
								),
						),
					);
				}
				await Promise.all(req);
				setChangeableRoles([]);
			}}
			loading={roleLoading}
		>
			<BottomSheetScrollView contentContainerStyle={{ marginTop: 30 }}>
				{/* avatar and name */}
				<UserPicAndName user={selectedUser} />
				<Tabs
					tabs={tabs}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					params={{ changeableRoles, setChangeableRoles }}
				/>
			</BottomSheetScrollView>
		</BottomSheet>
	);
}

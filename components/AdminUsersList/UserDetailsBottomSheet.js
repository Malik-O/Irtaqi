import { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
// component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheet from "../BottomSheet";
import UpdateUserFields from "./UpdateUserFields";
import GroupsTab from "./GroupsTab";
import Tabs from "../Tabs";
import Avatar from "../Avatar";
import ScreenText from "../ScreenText";
// hook
import useTranslate from "../../hook/useTranslate";
import useAssignToGroup from "../../hook/user/useAssignToGroup";
import useUpdateUser from "../../hook/user/useUpdateUser";
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
	const fields = useMemo(
		() => ({
			static: [
				{ label: "nationalID" },
				{ label: "gender" },
				{ label: "dateOfBirth", date: true },
			],
			editable: [
				{
					label: "email",
					keyboardType: "email-address",
					errorHint: "emailHint",
				},
				{
					label: "phone",
					keyboardType: "phone-pad",
					errorHint: "requiredHint",
				},
				{
					label: "parentPhone",
					keyboardType: "phone-pad",
					errorHint: "requiredHint",
				},
			],
		}),
		[],
	);
	// tabs
	const tabs = useMemo(() => [
		{
			title: translate("personalInfo"),
			ele: () => (
				<UpdateUserFields
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
				const updateUser = async () =>
					isUserDataChanged && (await updateUserData());
				if (changeableRoles?.length) {
					await Promise.all(
						changeableRoles
							.map(
								async (role) =>
									await updateRole(
										selectedUser,
										role,
										bottomSheetRef,
									),
							)
							.concat(updateUser),
					);
				}
				setChangeableRoles([]);
			}}
			loading={roleLoading}
		>
			<BottomSheetScrollView contentContainerStyle={{ marginTop: 30 }}>
				{/* avatar and name */}
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: paddingHorizontal,
						gap: 10,
					}}
				>
					<Avatar size={78} />
					<ScreenText
						variant="titleLarge"
						style={{ marginBottom: paddingHorizontal }}
					>
						{fullName(selectedUser)}
					</ScreenText>
				</View>
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

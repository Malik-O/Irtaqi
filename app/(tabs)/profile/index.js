import { useEffect, useState, useMemo } from "react";
import { View } from "react-native";
// redux
import { useSelector } from "react-redux";
// components
import ScreenView from "../../../components/ScreenView";
import Card from "../../../components/Card";
import PrimaryButton from "../../../components/PrimaryButton";
import UpdateUserFields from "../../../components/AdminUsersList/UpdateUserFields";
import UserPicAndName from "../../../components/AdminUsersList/UserPicAndName";
// styles
import { paddingHorizontal } from "../../../styles/layout";
// hook
import useSetupLanguage from "../../../hook/useSetupLanguage";
import useLogout from "../../../hook/useLogout";
import useTheme from "../../../hook/useTheme";
import useTranslate from "../../../hook/useTranslate";
import useUserFields from "../../../hook/user/useUserFields";
import useUpdateUser from "../../../hook/user/useUpdateUser";
// utils
import deepEqual from "../../../utils/deepEqual";

const langs = [
	{ label: "English", value: "en" },
	{ label: "عربي", value: "ar" },
];

export default function () {
	const theme = useTheme();
	const translate = useTranslate();
	const logout = useLogout();
	// user
	const { userData } = useSelector((state) => state.user);
	const fields = useUserFields();
	// form
	const [selectedUserFrom, setSelectedUserFrom] = useState({});
	const { mutationAction: updateUserData, isLoading } =
		useUpdateUser(selectedUserFrom);
	useEffect(() => {
		setSelectedUserFrom(userData);
	}, [userData]);
	// is there any changes
	const compareList = useMemo(
		() => fields.editable.map((field) => field.label),
		[],
	);
	const isUserDataChanged = useMemo(
		() => !deepEqual(userData, selectedUserFrom, compareList),
		[userData, selectedUserFrom],
	);
	return (
		<ScreenView>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: paddingHorizontal,
				}}
			>
				<UserPicAndName user={userData} avatarSize={100} />
			</View>
			<Card>
				{isUserDataChanged && (
					<PrimaryButton
						title={translate("saveChanges", true)}
						text
						mutationAction={async () =>
							isUserDataChanged && (await updateUserData())
						}
						style={{ marginBottom: paddingHorizontal }}
						loading={isLoading}
					/>
				)}
				<UpdateUserFields
					fields={fields}
					selectedUser={userData}
					setSelectedUser={() => {}}
					selectedUserFrom={selectedUserFrom}
					setSelectedUserFrom={setSelectedUserFrom}
					inSheet={false}
				/>
				<PrimaryButton
					title={translate("logout", true)}
					text
					color="error"
					mutationAction={logout}
					style={{ marginTop: paddingHorizontal }}
				/>
			</Card>
		</ScreenView>
	);
}

/*
<View
	style={{
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		marginTop: paddingHorizontal,
	}}
>
	<ScreenText
		style={{ alignSelf: "center" }}
		variant="titleMedium"
	>
		{translate("darkTheme", true)}
	</ScreenText>
	<Switch
	// value={formData.hasRabt}
	// onValueChange={(val) =>
	// 	dispatch(addPlanActions.setState(["hasRabt", val]))
	// }
	/>
</View>
<ListItemRipple
	variant="titleMedium"
	title={translate("language", true)}
	selectedItem={currentLanguage.label}
	action={() => {
		setVisible(true);
	}}
	style={{
		marginTop: paddingHorizontal,
	}}
/>
<Portal>
	<Dialog
		visible={visible}
		onDismiss={hideDialog}
		// style={{ backgroundColor: "red" }}
	>
		<Dialog.Title>{translate("chooseLang", true)}</Dialog.Title>
		<Dialog.Content>
			{langs.map((lang) => (
				<ListItemRipple
					key={lang.value}
					title={lang.label}
					checkbox
					isChecked={locale === lang.value}
					action={() => setupLanguage(lang.value)}
				/>
			))}
		</Dialog.Content>
	</Dialog>
</Portal>
*/

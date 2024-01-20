import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
// components
import { Text } from "react-native-paper";
import TextInput from "../TextInput";
import Hr from "../Hr";
import Card from "../Card";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useTranslate from "../../hook/useTranslate";
import ListItemRipple from "../ListItemRipple";
import useAddUserValidate from "../../hook/useAddUserValidate";
// styles
import { paddingHorizontal } from "../../styles/layout";

export default function (isStepValidName) {
	const translate = useTranslate();
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	// add empty array at first
	useEffect(() => {
		dispatch(addUserActions.setState(["selectedRole", null]));
	}, []);
	const roles = useMemo(
		() => [
			{ title: translate("student"), value: "student" },
			{ title: translate("teacher"), value: "teacher" },
			{ title: translate("group_admin"), value: "group_admin" },
			// { title: translate("secretary"), value: "secretary" },
		],
		[],
	);
	// is valid
	const isValidStateNames = { role: "role_isValid" };
	useEffect(() => {
		dispatch(
			addUserActions.setState([
				isValidStateNames.role,
				!!formData.selectedRole,
			]),
		);
	}, [formData.selectedRole]);
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addUserActions,
		formData,
	);
	// select action
	function isChecked(value) {
		return formData.selectedRole === value;
	}
	function selectItemAction(value) {
		if (formData.selectedRole !== value)
			dispatch(addUserActions.setState(["selectedRole", value]));
		console.log("value:", value, formData.selectedRole);
	}

	return (
		<Card>
			<Text
				variant="headlineSmall"
				style={{ marginBottom: paddingHorizontal }}
			>
				{translate("permission")}
			</Text>
			{roles.map((role, i) => (
				<View key={i}>
					<ListItemRipple
						title={role.title}
						checkbox
						isChecked={isChecked(role.value)}
						action={() => selectItemAction(role.value)}
					/>
					{/* make a spread line between checkboxes */}
					{i + 1 !== roles.length && <Hr opacity={0.1} />}
				</View>
			))}
		</Card>
	);
}

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
	const { groupID } = useGlobalSearchParams();
	const translate = useTranslate();
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const { groups } = useSelector((state) => state.groups);
	const dispatch = useDispatch();
	// add empty array at first
	useEffect(() => {
		dispatch(addUserActions.setState(["selectedGroups", [groupID]]));
	}, []);
	const roles = useMemo(
		() => [
			{ title: translate("student") },
			{ title: translate("teacher") },
			{ title: translate("admin") },
			{ title: translate("secretary") },
		],
		[],
	);
	// is valid
	const isValidStateNames = {
		groups: "groups_isValid",
	};
	useEffect(() => {
		dispatch(
			addUserActions.setState([
				isValidStateNames.groups,
				!!formData.selectedGroups?.length,
			]),
		);
	}, [formData.selectedGroups]);
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addUserActions,
		formData,
	);
	// select action
	function isChecked(id) {
		return (
			formData.selectedGroups &&
			formData.selectedGroups.indexOf(id) !== -1
		);
	}
	function selectItemAction(id) {
		let newSelectedGroups = [];
		if (formData.selectedGroups?.indexOf(id) !== -1)
			newSelectedGroups = formData.selectedGroups?.filter(
				(sg) => sg !== id,
			);
		else newSelectedGroups = [...formData?.selectedGroups, id];
		// update state
		dispatch(
			addUserActions.setState(["selectedGroups", newSelectedGroups]),
		);
	}

	return (
		<Card>
			<Text
				variant="headlineSmall"
				style={{ marginBottom: paddingHorizontal }}
			>
				{translate("assignToGroup")}
			</Text>
			{roles.map((role, i) => (
				<View key={i}>
					<ListItemRipple
						title={role.title}
						checkbox
						isChecked={isChecked(role.id)}
						action={() => selectItemAction(role.id)}
					/>
					{/* make a spread line between checkboxes */}
					{i + 1 !== roles.length && <Hr opacity={0.1} />}
				</View>
			))}
		</Card>
	);
}

import { useEffect } from "react";
import { View } from "react-native";
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
	const { groups } = useSelector((state) => state.groups);
	const dispatch = useDispatch();
	// is valid
	const isValidStateNames = {
		groups: "groups_isValid",
	};
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addUserActions,
		formData,
	);
	// add empty array at first
	useEffect(() => {
		dispatch(addUserActions.setState(["selectedGroups", []]));
	}, []);
	// select action
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
		//
		dispatch(
			addUserActions.setState([
				"groups_isValid",
				!!newSelectedGroups.length,
			]),
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
			{groups.map((group, i) => (
				<View key={i}>
					<ListItemRipple
						title={group.title}
						checkbox
						isChecked={
							formData.selectedGroups?.indexOf(group.id) !== -1
						}
						action={() => selectItemAction(group.id)}
					/>
					{/* make a spread line between checkboxes */}
					{i + 1 !== groups.length && <Hr />}
				</View>
			))}
		</Card>
	);
}

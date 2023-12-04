import { View } from "react-native";
// components
import { Text } from "react-native-paper";
import TextInput from "../TextInput";
import Hr from "../Hr";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
// hook
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
import ListItemRipple from "../ListItemRipple";
import { useState } from "react";
//
import { paddingHorizontal } from "../../styles/layout";

export default function (isStepValidName) {
	const translate = useTranslate();
	//
	const isValidStateNames = {
		groups: "groups_isValid",
	};
	// redux
	const { groups } = useSelector((state) => state.groups);
	const [selectedGroups, setSelectedGroups] = useState([]);
	// useAddUserValidate(isValidStateNames, isStepValidName);
	function selectItemAction(i) {
		if (selectedGroups.indexOf(i) !== -1)
			setSelectedGroups(selectedGroups.filter((sg) => sg !== i));
		else setSelectedGroups([...selectedGroups, i]);
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
						isChecked={selectedGroups.indexOf(i) !== -1}
						action={() => selectItemAction(i)}
					/>
					{/* make a spread line between checkboxes */}
					{i + 1 !== groups.length && <Hr />}
				</View>
			))}
		</Card>
	);
}

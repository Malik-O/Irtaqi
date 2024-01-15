import { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
// component
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableRipple, Menu } from "react-native-paper";
import ScreenText from "../ScreenText";
// hook
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// styles
import { paddingHorizontal } from "../../styles/layout";

export default function ({
	group,
	params: { changeableRoles, setChangeableRoles },
	isRemoved,
	list,
}) {
	const translate = useTranslate();
	const theme = useTheme();
	// menu
	const [visible, setVisible] = useState(false);
	const isIdle = useCallback(
		(changeableRoles, role) =>
			changeableRoles.find(
				(cRole) =>
					group.id === cRole.selectedGroup.id &&
					cRole.selectedRole?.value === role,
			),
		[group],
	);
	const selectedRole = useMemo(() => {
		const inChangeableList = changeableRoles.find(
			(r) => r.selectedGroup.id === group.id && !r.remove,
		);
		console.log("group:", { group, inChangeableList, changeableRoles });
		return {
			value: inChangeableList?.selectedRole?.value || group.as,
			changed: !!inChangeableList,
		};
	}, [changeableRoles, group]);
	const menuColor = useMemo(
		() => theme.reverse[selectedRole.changed ? "primary" : "secondary"],
		[selectedRole],
	);
	return (
		<Menu
			visible={visible}
			onDismiss={() => setVisible(false)}
			anchor={
				<TouchableRipple onPress={() => !isRemoved && setVisible(true)}>
					<View
						style={{
							flexDirection: "row",
							gap: 5,
							padding: paddingHorizontal,
						}}
					>
						<ScreenText style={{ color: menuColor }}>
							{translate(selectedRole.value)}
						</ScreenText>
						<Ionicons
							name="caret-down"
							color={menuColor}
							size={20}
						/>
					</View>
				</TouchableRipple>
			}
		>
			{list.map((role, i) => (
				<Menu.Item
					onPress={() => {
						setVisible(false);
						if (group.as === role)
							setChangeableRoles((value) =>
								value.filter(
									(v) => v.selectedGroup.id !== group.id,
								),
							);
						else if (!isIdle(changeableRoles, role))
							setChangeableRoles((value) => [
								...value,
								{
									selectedRole: { value: role },
									selectedGroup: group,
								},
							]);
					}}
					title={translate(role)}
					key={i}
				/>
			))}
		</Menu>
	);
}

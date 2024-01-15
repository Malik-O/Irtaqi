import { useMemo } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
// component
import Ionicons from "@expo/vector-icons/Ionicons";
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
import { TouchableRipple } from "react-native-paper";
import ScreenText from "../ScreenText";
import ChooseGroupMenu from "./ChooseGroupMenu";
import ChooseMenu from "./ChooseMenu";
// hook
import useGroupsLight from "../../hook/groups/useGroupsLight";
import useTheme from "../../hook/useTheme";
// styles
import { paddingHorizontal } from "../../styles/layout";
// redux
import { useSelector } from "react-redux";
//
function UserRoleItem({ group, params, list }) {
	const theme = useTheme();
	const isRemoved = useMemo(
		() =>
			params.changeableRoles.find(
				(role) => role.selectedGroup.id === group.id && role.remove,
			)?.remove,
		[params.changeableRoles],
	);
	const roles = useMemo(() => ["student", "teacher", "group_admin"], []);
	// remove style
	const userRoleContainerStyle = useAnimatedStyle(() => ({
		backgroundColor: isRemoved ? theme.error : "transparent",
	}));
	const removeButtonStyle = useAnimatedStyle(() => ({
		color: isRemoved ? theme.success : theme.error,
	}));
	// remove action
	function toggleRemoveRole(group) {
		if (isRemoved)
			params.setChangeableRoles((value) =>
				value.filter((role) => role.selectedGroup.id !== group.id),
			);
		else
			params.setChangeableRoles((value) => [
				...value,
				{
					selectedGroup: group,
					remove: true,
				},
			]);
	}
	return (
		<Animated.View
			style={[
				userRoleContainerStyle,
				{
					paddingHorizontal,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				},
			]}
		>
			<View
				style={{
					flexDirection: "row",
					gap: 15,
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={() => toggleRemoveRole(group)}>
					<AnimatedIonicons
						name={isRemoved ? "add-circle" : "remove-circle"}
						// color={theme.reverse.error}
						style={removeButtonStyle}
						size={26}
					/>
				</TouchableOpacity>
				<ScreenText
					variant="titleMedium"
					textOverflow
					style={{
						fontWeight: "bold",
						paddingVertical: paddingHorizontal,
					}}
				>
					{group?.title}
				</ScreenText>
			</View>
			<ChooseGroupMenu
				group={group}
				params={params}
				isRemoved={isRemoved}
				list={roles}
			/>
		</Animated.View>
	);
}

export default function (selectedUser, params) {
	const { groups: userGroups, loading } = useGroupsLight(selectedUser.id);
	// redux
	const { groups } = useSelector((state) => state.groups);
	// render
	if (loading) return <ActivityIndicator />;
	return (
		<View>
			{userGroups.map((group, i) => (
				<UserRoleItem group={group} params={params} key={i} />
			))}

			<Animated.View
				style={[
					{
						paddingHorizontal,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						backgroundColor: "gray",
					},
				]}
			>
				<ChooseMenu
					group={{}}
					params={params}
					list={groups.map((group) => group.title)}
				/>
			</Animated.View>
		</View>
	);
}

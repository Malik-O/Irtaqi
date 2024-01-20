import { useState } from "react";
import { View } from "react-native";
// component
import Avatar from "../Avatar";
import ScreenText from "../ScreenText";
// hook
import useTranslate from "../../hook/useTranslate";
// style
import { paddingHorizontal } from "../../styles/layout";
// utils
import fullName from "../../utils/fullName";

export default function userPicAndName({ user, avatarSize = 78 }) {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				marginTop: paddingHorizontal,
				gap: 10,
			}}
		>
			<Avatar size={avatarSize} />
			<ScreenText
				variant="titleLarge"
				style={{ marginBottom: paddingHorizontal }}
			>
				{fullName(user)}
			</ScreenText>
		</View>
	);
}

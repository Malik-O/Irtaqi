import { useRef } from "react";
import { View } from "react-native";
// hooks
import useTranslate from "../../../hook/useTranslate";
// components
import ScreenView from "../../../components/ScreenView";
import ScreenText from "../../../components/ScreenText";
import AddGroupButton from "../../../components/groupsPage/AddGroupButton";
import GroupList from "../../../components/groupsPage/GroupList";
import AddGroupBottomSheet from "../../../components/groupsPage/AddGroupBottomSheet";
// styles
import { paddingHorizontal } from "../../../styles/layout";

export default function () {
	const translate = useTranslate();
	const sheetRef = useRef(null);
	return (
		<ScreenView hasLoading={true}>
			<View
				style={{
					paddingHorizontal,
					marginVertical: paddingHorizontal,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<ScreenText variant="displayMedium">
					{translate("groups", true)}
				</ScreenText>
				<AddGroupButton sheetRef={sheetRef} />
			</View>
			<GroupList />
			<AddGroupBottomSheet sheetRef={sheetRef} />
		</ScreenView>
	);
}

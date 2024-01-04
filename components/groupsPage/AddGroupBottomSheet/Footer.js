import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { BottomSheetFooter } from "@gorhom/bottom-sheet";
// component
import ScreenText from "../../ScreenText";
// styles
import { paddingHorizontal } from "../../../styles/layout";
// hook
import useTheme from "../../../hook/useTheme";
import useTranslate from "../../../hook/useTranslate";
import useCreateGroups from "../../../hook/groups/useCreateGroups";

function ButtonContent({ loading }) {
	const theme = useTheme();
	const translate = useTranslate();
	// return
	if (loading) return <ActivityIndicator />;
	else
		return (
			<ScreenText
				variant="titleLarge"
				style={{
					textAlign: "center",
					color: theme.reverse.secondary,
				}}
			>
				{translate("createGroup")}
			</ScreenText>
		);
}
export default function (sheetRef, props) {
	const theme = useTheme();
	const { mutationAction, loading } = useCreateGroups(sheetRef);
	return (
		<BottomSheetFooter {...props} bottomInset={30}>
			<TouchableOpacity onPress={mutationAction} disabled={loading}>
				<View
					style={{
						backgroundColor: theme.primary,
						textAlign: "center",
						marginHorizontal: paddingHorizontal,
						borderRadius: paddingHorizontal,
						paddingVertical: paddingHorizontal / 2,
					}}
				>
					<ButtonContent loading={loading} />
				</View>
			</TouchableOpacity>
		</BottomSheetFooter>
	);
}

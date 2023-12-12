import { View, Pressable, TouchableOpacity, Switch } from "react-native";
// components
import ScreenView from "../../components/ScreenView";
import ScreenText from "../../components/ScreenText";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
// styles
import { paddingHorizontal } from "../../styles/layout";
// hook
import useLogout from "../../hook/useLogout";
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
import capitalize from "../../utils/capitalize";

export default function () {
	const theme = useTheme();
	const translate = useTranslate();
	const logout = useLogout();
	// get the stored user data to redux state

	return (
		<ScreenView>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: paddingHorizontal,
				}}
			>
				<Avatar size={100} />
				{/* <Button title="Add Photo" onPress={() => {}} style={{}} /> */}
				<ScreenText
					style={{
						alignSelf: "center",
						color: theme.reverse.primary,
						marginTop: paddingHorizontal,
					}}
					variant="titleLarge"
				>
					{capitalize(translate("addPhoto"))}
				</ScreenText>
			</View>
			<Card>
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
						{capitalize(translate("darkTheme"))}
					</ScreenText>
					<Switch
					// value={formData.hasRabt}
					// onValueChange={(val) =>
					// 	dispatch(addPlanActions.setState(["hasRabt", val]))
					// }
					/>
				</View>
				<ScreenText variant="titleMedium">
					{capitalize(translate("language"))}
				</ScreenText>
				<TouchableOpacity onPress={logout}>
					<ScreenText
						style={{
							color: theme.error,
							width: "auto",
							textAlign: "center",
							marginTop: paddingHorizontal,
							fontWeight: "bold",
						}}
						variant="titleMedium"
					>
						{capitalize(translate("logout"))}
					</ScreenText>
				</TouchableOpacity>
			</Card>
		</ScreenView>
	);
}

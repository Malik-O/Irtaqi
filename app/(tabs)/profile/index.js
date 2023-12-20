import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
// components
import { Dialog, Portal, Button } from "react-native-paper";
import ScreenView from "../../../components/ScreenView";
import ScreenText from "../../../components/ScreenText";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import ListItemRipple from "../../../components/ListItemRipple";
// styles
import { paddingHorizontal } from "../../../styles/layout";
// hook
import useSetupLanguage from "../../../hook/useSetupLanguage";
import useLogout from "../../../hook/useLogout";
import useTheme from "../../../hook/useTheme";
import useTranslate from "../../../hook/useTranslate";
import capitalize from "../../../utils/capitalize";

const langs = [
	{ label: "English", value: "en" },
	{ label: "عربي", value: "ar" },
];

export default function () {
	const theme = useTheme();
	const translate = useTranslate();
	const logout = useLogout();
	// get the stored user data to redux state
	const [visible, setVisible] = useState(false);

	const hideDialog = () => setVisible(false);
	//
	const setupLanguage = useSetupLanguage();
	const { locale, rtl } = useSelector((state) => state.lang);
	const currentLanguage =
		langs.filter((lang) => lang.value === locale)?.[0] || langs[0];

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
					{translate("addPhoto", true)}
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
						{translate("darkTheme", true)}
					</ScreenText>
					<Switch
					// value={formData.hasRabt}
					// onValueChange={(val) =>
					// 	dispatch(addPlanActions.setState(["hasRabt", val]))
					// }
					/>
				</View>
				<ListItemRipple
					variant="titleMedium"
					title={translate("language", true)}
					selectedItem={currentLanguage.label}
					action={() => {
						setVisible(true);
					}}
					style={{
						marginTop: paddingHorizontal,
					}}
				/>
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
						{translate("logout", true)}
					</ScreenText>
				</TouchableOpacity>
			</Card>
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideDialog}
					// style={{ backgroundColor: "red" }}
				>
					<Dialog.Title>{translate("chooseLang", true)}</Dialog.Title>
					<Dialog.Content>
						{langs.map((lang) => (
							<ListItemRipple
								key={lang.value}
								title={lang.label}
								checkbox
								isChecked={locale === lang.value}
								action={() => setupLanguage(lang.value)}
							/>
						))}
					</Dialog.Content>
				</Dialog>
			</Portal>
		</ScreenView>
	);
}

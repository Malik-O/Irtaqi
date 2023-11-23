// components
import { TextInput } from "react-native-paper";
import Card from "../Card";
// hook
import useTranslate from "../../hook/useTranslate";
// utils
import capitalize from "../../utils/capitalize";

export default function () {
	const translate = useTranslate();
	return (
		<Card>
			<TextInput
				style={{ backgroundColor: "transparent" }}
				label={capitalize(translate("email"), false)}
				keyboardType="email-address"
			/>
			<TextInput
				style={{ backgroundColor: "transparent" }}
				label={capitalize(translate("phone"), false)}
				keyboardType="phone-pad"
			/>
			<TextInput
				style={{ backgroundColor: "transparent" }}
				label={capitalize(translate("parentPhone"), false)}
				keyboardType="phone-pad"
			/>
		</Card>
	);
}

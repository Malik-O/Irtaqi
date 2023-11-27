import { View, Text } from "react-native";
// components
import { TextInput } from "react-native-paper";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../../store/addUser";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../ScreenText";
// hook
import useTranslate from "../../hook/useTranslate";
import useTheme from "../../hook/useTheme";
// utils
import capitalize from "../../utils/capitalize";

export default function ({
	stateName,
	label,
	keyboardType = "default",
	regex = /.+/,
	isValidStateName,
	errorHint,
	storeAction,
}) {
	const translate = useTranslate();
	const theme = useTheme();
	label = label || capitalize(translate(stateName), false);
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	// validate
	function validate() {
		if (!isValidStateName) return;
		regex = new RegExp(regex);
		const text = formData[stateName]?.trim();
		const isValid = !!(text && regex.exec(text));
		dispatch(storeAction.setState([isValidStateName, isValid]));
	}
	// underlineColor
	const underlineColor =
		formData[isValidStateName] === undefined ||
		formData[isValidStateName] !== false
			? ""
			: "red";
	return (
		<View>
			<TextInput
				label={label}
				value={formData[stateName]}
				onChangeText={(text) =>
					dispatch(addUserActions.setState([stateName, text]))
				}
				onBlur={validate}
				style={{ backgroundColor: "transparent" }}
				keyboardType={keyboardType}
				underlineColor={underlineColor}
				right={0}
			/>
			<View
				style={{
					position: "absolute",
					top: 30,
					right: 0,
				}}
			>
				{formData[isValidStateName] ? (
					<Ionicons
						name="checkmark"
						size={20}
						color={theme.success}
					/>
				) : null}
			</View>
			{formData[isValidStateName] === false ? (
				<ScreenText style={{ color: theme.error, marginTop: 10 }}>
					{errorHint}
				</ScreenText>
			) : null}
		</View>
	);
}

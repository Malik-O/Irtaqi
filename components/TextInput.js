import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
// components
import { TextInput } from "react-native-paper";
// redux
import { useDispatch } from "react-redux";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "./ScreenText";
// hook
import useTranslate from "../hook/useTranslate";
import useTheme from "../hook/useTheme";
// utils
import capitalize from "../utils/capitalize";
export default function ({
	stateName,
	label,
	keyboardType = "default",
	regex = /.+/,
	isValidStateName,
	errorHint,
	storeAction,
	formData,
	defaultValue,
	placeholder,
	secureTextEntry = false,
}) {
	const dispatch = useDispatch();
	const translate = useTranslate();
	const theme = useTheme();
	label = label || translate(stateName, true, false);
	const [isPasswordSecure, setIsPasswordSecure] = useState(true);
	// validate
	function validate(text = formData[stateName]?.trim()) {
		if (!isValidStateName) return;
		regex = new RegExp(regex);
		// console.log("0:", text, regex.exec(text), isValid);
		const isValid = !!(text && regex.exec(text));
		dispatch(storeAction.setState([isValidStateName, isValid]));
	}
	// underlineColor
	const underlineColor =
		formData[isValidStateName] === undefined ||
		formData[isValidStateName] !== false
			? ""
			: theme.error;
	//
	function assignValueToState(text) {
		dispatch(storeAction.setState([stateName, text]));
		validate(text);
	}
	// set default value
	useEffect(() => {
		if (defaultValue) assignValueToState(defaultValue);
	}, []);
	return (
		<View>
			<TextInput
				label={label}
				value={formData[stateName]}
				onChangeText={assignValueToState}
				onBlur={() => validate()}
				style={{ backgroundColor: "transparent" }}
				keyboardType={keyboardType}
				underlineColor={underlineColor}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry && isPasswordSecure}
				right={
					secureTextEntry && (
						<TextInput.Icon
							icon={isPasswordSecure ? "eye" : "eye-off"}
							onPress={() =>
								setIsPasswordSecure(!isPasswordSecure)
							}
						/>
					)
				}
				autoCorrect={false}
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
				<ScreenText
					style={{ color: theme.error, marginTop: 10 }}
					variant="bodySmall"
				>
					{errorHint}
				</ScreenText>
			) : null}
		</View>
	);
}

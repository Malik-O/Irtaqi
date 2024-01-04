import { useEffect, useState, forwardRef } from "react";
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

export default forwardRef(
	(
		{
			stateName,
			label,
			keyboardType = "default",
			regex = /.+/,
			isValidStateName,
			errorHint,
			defaultValue,
			placeholder,
			secureTextEntry = false,
			BottomSheet = false,
			Comp = TextInput,
			multiline,
			// store
			updateStoreFun,
			storeAction,
			formData,
			// return key
			onSubmitEditing,
			returnKeyType,
		},
		ref,
	) => {
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
			// update store
			if (updateStoreFun) updateStoreFun(isValidStateName, isValid);
			else {
				console.log("isValid:", isValidStateName, isValid);
				dispatch(storeAction.setState([isValidStateName, isValid]));
			}
		}
		// underlineColor
		const underlineColor =
			formData[isValidStateName] === undefined ||
			formData[isValidStateName] !== false
				? ""
				: theme.error;
		//
		function assignValueToState(text) {
			validate(text);
			if (updateStoreFun) updateStoreFun(stateName, text);
			else dispatch(storeAction.setState([stateName, text]));
		}
		// set default value
		useEffect(() => {
			if (defaultValue) assignValueToState(defaultValue);
		}, []);
		return (
			<View>
				<Comp
					ref={ref}
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
					onSubmitEditing={onSubmitEditing}
					returnKeyType={returnKeyType}
					multiline={multiline}
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
	},
);

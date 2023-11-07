import { View, Text, ActivityIndicator, TextInput, Button } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import tw from "twrnc";
// hooks
import useLogin from "../hook/useLogin";
// redux
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";
// page
export default function login() {
	const [email, setEmail] = useState("teacher@gmail.com");
	const [password, setPassword] = useState("123");
	// redux
	const { userData } = useSelector((state) => state.user); // select a slice
	// login hook
	var { isLoading, error, loginWrapper } = useLogin({
		email,
		password,
	});

	return (
		<View style={tw`flex-1 items-center justify-center bg-black`}>
			{/* error message */}
			<Text style={tw`text-red-500`}>error: {error || "none"}</Text>
			{/* email input field */}
			<Text style={tw`text-white`}>email</Text>
			<TextInput
				style={tw`border-4 border-sky-500 w-full p-3 text-white`}
				value={email}
				onChangeText={setEmail}
			/>
			{/* password input field */}
			<Text style={tw`text-white`}>password</Text>
			<TextInput
				style={tw`border-4 border-sky-500 w-full p-3 text-white`}
				value={password}
				onChangeText={setPassword}
				secureTextEntry={true}
			/>
			{/* action */}
			<Button
				title="login"
				onPress={loginWrapper}
				disabled={isLoading}
				style={tw`w-full bg-green-500`}
			/>
			{/*  */}
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Text style={tw`text-white text-4xl font-bold`}>
					User ID is: {JSON.stringify(userData)}
				</Text>
			)}
		</View>
	);
}

import { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useRouter, Redirect } from "expo-router";
// hooks
import useLogin from "../hook/useLogin";
import useTranslate from "../hook/useTranslate";
// redux
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";
// components
import ScreenView from "../components/ScreenView";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import ScreenText from "../components/ScreenText";

// page
export default function () {
	const router = useRouter();
	const translate = useTranslate();
	// redux
	const { userData, loginFormData } = useSelector((state) => state.user); // select a slice
	// login hook
	var { isLoading, isSuccess, loginWrapper } = useLogin({
		email: loginFormData.email,
		password: loginFormData.password,
	});
	// redirect after successful login
	useEffect(() => {
		console.log(isSuccess && !isLoading && userData?.id);
		if (isSuccess && !isLoading && userData?.id) router.replace("/home");
	});

	return (
		<ScreenView style={{ alginItems: "center", justifyContent: "center" }}>
			<Card>
				<TextInput
					stateName="email"
					storeAction={userActions}
					formData={loginFormData}
				/>
				<TextInput
					stateName="password"
					storeAction={userActions}
					formData={loginFormData}
					secureTextEntry
				/>
				{/* action */}
				<View style={{ marginTop: 20 }}>
					{isLoading ? (
						<ActivityIndicator />
					) : (
						<Button
							title="login"
							onPress={loginWrapper}
							disabled={isLoading}
						/>
					)}
				</View>
			</Card>
		</ScreenView>
	);
}

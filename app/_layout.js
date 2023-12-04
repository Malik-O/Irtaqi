import React from "react";
import { Stack } from "expo-router";
// components
import ApolloProvider from "../components/ApolloProvider";
import Snackbar from "../components/notifications/Snackbar";
// redux
import { Provider } from "react-redux";
import { Store } from "../store";
// paper
import { PaperProvider } from "react-native-paper";

export default function _layout() {
	return (
		<ApolloProvider>
			<Provider store={Store}>
				<PaperProvider>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
					</Stack>
				</PaperProvider>
			</Provider>
		</ApolloProvider>
	);
}

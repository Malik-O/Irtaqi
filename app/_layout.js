import React from "react";
import { Stack } from "expo-router";
// apollo
import ApolloProvider from "../components/ApolloProvider";
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

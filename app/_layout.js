import "../wdyr";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";
// components
import ApolloProvider from "../components/ApolloProvider";
import Snackbar from "../components/notifications/Snackbar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
					<BottomSheetModalProvider>
						<Snackbar />
						<Stack
							screenOptions={{
								headerShown: false,
								animation: "fade",
							}}
						></Stack>
					</BottomSheetModalProvider>
				</PaperProvider>
			</Provider>
		</ApolloProvider>
	);
}

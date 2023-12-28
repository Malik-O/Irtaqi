import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function App() {
	const animation = useRef(null);
	useEffect(() => {
		// You can control the ref programmatically, rather than using autoPlay
		// animation.current?.play();
	}, []);

	return (
		<View style={styles.animationContainer}>
			<LottieView
				// autoPlay
				ref={animation}
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
				}}
				// Find more Lottie files at https://lottiefiles.com/featured
				source={require("../../../assets/gradientBall.json")}
			/>
			<View style={styles.buttonContainer}>
				<Button
					title="Restart Animation"
					onPress={() => {
						animation.current?.reset();
						animation.current?.play();
					}}
				/>
				<Button
					title="stop"
					onPress={() => {
						console.log("0:", animation.current);
						// animation.current?.stop();
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});

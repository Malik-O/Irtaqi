import React, { useState, useEffect } from "react";
import { View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ProfileScreen = () => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!",
				);
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [3, 6],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			// Send the image URI to the backend.
			uploadImage(result.assets[0].uri);
		}
	};

	const uploadImage = async (uri) => {
		// Convert the image data to a blob
		const response = await fetch(uri);
		const blob = await response.blob();
		// Create a FormData object
		const formData = new FormData();
		formData.append("profilePicture", blob, "profile.png");

		// Send a POST request to your backend
		await axios
			.post("http://192.168.1.2:800/img", formData)
			.then((data) => {
				console.log("Upload successful:", data);
				// Handle the response from the backend
			})
			.catch((error) => {
				console.error("Error uploading image:", error);
			});
	};

	return (
		<View>
			<Button
				title="Pick an image from camera roll"
				onPress={pickImage}
			/>
			{image && (
				<Image
					source={{ uri: image }}
					style={{ width: 200, height: 200 }}
				/>
			)}
		</View>
	);
};

export default ProfileScreen;

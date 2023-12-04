import { View, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
// paper
import { TextInput } from "react-native-paper";
// styles
const themeStyles = (theme) => ({
	selectionColor:
		theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
	itemStyle: { color: theme === "light" ? "#000000" : "#ffffff" },
});

export default function ({
	enableSearch,
	items,
	isReversed,
	selectedItem,
	setSelectedItem,
}) {
	const colorScheme = useColorScheme();
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState(items);
	// calc search result
	function onSearchChange(search) {
		if (!enableSearch) return items;
		setSearch(search);
		const searchForReg = new RegExp(search.replace(/\s/g, "")),
			cleanReg = new RegExp("[^\u0621-\u063A^\u0641-\u064A]", "g");
		// get results
		let results = items.filter((item) => item.text.match(searchForReg));
		if (results.length) setSearchResult(results);
	}
	// when opening the dialog reset search
	// useEffect(() => {
	// 	setSelectedItem(searchResult[0].value);
	// }, []);
	useEffect(() => {
		setSelectedItem(items[0].value);
		setSearchResult(items);
	}, [isReversed]);
	// styles
	const styles = themeStyles(colorScheme);

	return (
		<View>
			{enableSearch ? (
				<TextInput
					label="Search"
					value={search}
					onChangeText={onSearchChange}
					returnKeyType="search"
				/>
			) : null}
			<Picker
				selectedValue={selectedItem}
				onValueChange={setSelectedItem}
				selectionColor={styles.selectionColor}
				itemStyle={styles.itemStyle}
			>
				{searchResult?.map((item) => (
					<Picker.Item
						label={item.text}
						value={item.value}
						key={item}
					/>
				))}
			</Picker>
		</View>
	);
}

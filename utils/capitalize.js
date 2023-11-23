const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export default function (str, allWords = true) {
	if (!allWords) return capitalizeWord(str);
	return str.split(" ").map(capitalizeWord).join(" ").trim();
}

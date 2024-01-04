export default function (inputString = "", replacementList = []) {
	// Split the input string based on '###'
	var words = inputString.split("###");

	// Trim white spaces from each word
	words = words.map(function (word) {
		return word.trim();
	});

	// Combine words with elements from the replacement list
	var result = words.map(function (word, index) {
		if (replacementList[index]) return word + " " + replacementList[index];
		else return word;
	});
	// console.log(result);
	// Join the result into a single string
	return result.join(" ");
}

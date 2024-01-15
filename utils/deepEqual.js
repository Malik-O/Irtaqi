function extractSomeKeys(obj, keysList) {
	const newObj = {};
	for (const key of keysList) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = obj[key];
		}
	}
	return newObj;
}
function compareKeys(x, y, compareList) {
	x = extractSomeKeys(x, compareList);
	y = extractSomeKeys(y, compareList);
	return (
		Object.keys(x).length === Object.keys(y).length &&
		Object.keys(x).reduce(function (isEqual, key) {
			return isEqual && deepEqual(x[key], y[key]);
		}, true)
	);
}
export default function deepEqual(x, y, compareList) {
	return x && y && typeof x === "object" && typeof y === "object"
		? compareKeys(x, y, compareList)
		: x === y;
}

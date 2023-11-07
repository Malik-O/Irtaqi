import { verseKeyToName } from "./stringify";
// fill an array with the verses keys
export function versesKeysArr(plan, surahAdj) {
	const { from, to } = plan.day;
	const [fromSurah, fromAyah] = from.split(":");
	const [toSurah, toAyah] = to.split(":");
	let allVerses = [];
	// fill the array
	for (let surahI = fromSurah - 1; surahI < toSurah; surahI++) {
		let toInThisSurah =
			surahI == toSurah - 1 ? toAyah : surahAdj[surahI].verses_count;
		for (let ayahI = fromAyah - 1; ayahI < toInThisSurah; ayahI++)
			allVerses.push(`${surahI + 1}:${ayahI + 1}`);
	}
	return allVerses;
}
// get verse name
export function verseName(allVerses, amount_done) {
	const currentVerse = allVerses[amount_done - 1];
	return currentVerse && verseKeyToName(currentVerse);
}

import { verseKeyToName } from "./stringify";
// fill an array with the verses keys
export function versesKeysArr(plan, surahAdj) {
	surahAdj = [...surahAdj.chapters];
	// split verse key
	const [fromSurah, fromAyah] = plan.day.from.split(":");
	const [toSurah, toAyah] = plan.day.to.split(":");
	let allVerses = [];
	// loop throw surahs
	for (let surahI = fromSurah - 1; ; ) {
		// when to break
		if (plan.order_reversed) {
			if (surahI < toSurah - 1) break;
		} else if (surahI >= toSurah) break;
		// loop throw verses
		let toInThisSurah =
			surahI == toSurah - 1 ? toAyah : surahAdj[surahI].verses_count;
		for (let ayahI = fromAyah - 1; ayahI < toInThisSurah; ayahI++)
			allVerses.push(`${surahI + 1}:${ayahI + 1}`);
		// increment
		if (plan.order_reversed) surahI--;
		else surahI++;
	}
	return allVerses;
}
// get verse name
export function verseName(allVerses, amount_done) {
	const currentVerse = allVerses[amount_done - 1];
	return currentVerse && verseKeyToName(currentVerse);
}

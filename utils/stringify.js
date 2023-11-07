let cons = { lang: {} };
const versesPerPage = require("../store/quran/states/versesPerPage");
const surahAdj = require("../store/quran/states/surahAdj");

const setConstants = ({ localLang, translate }) => {
	cons.lang.isAr = localLang === "ar";
	cons.lang.translate = translate;
	cons.localLang = localLang;
};
// day to string
export default function stringify({
	courseTitle,
	title,
	day,
	details,

	translate,
	localLang,
}) {
	// if there is nothing
	if (!title && !day) return;
	title = translate(title);
	// set all the constants
	setConstants({ localLang, translate });
	// if the course is quran
	if (courseTitle.toLowerCase() === "quran") {
		let str = rangeToStr(day);
		// if (details) str = `${title}: ${str}`;
		// if (showDate) {
		//     let lang = cons.lang.isEn ? "en-GB" : "ar-EG",
		//         spread = cons.lang.isEn ? "," : "،",
		//         date = new Intl.DateTimeFormat(lang, { dateStyle: "full" })
		//             .format(day.date)
		//             .split(spread)[1];
		//     str = `<p>${date}</p> ${str}`;
		// }
		return str;
	} // normal book
	else {
		let de = [];
		let str = `${title}: from page ${day.from} to ${day.to}\n`;
		// details
		// if (!details) str = `${title}: ${str}`;
		de.push({ title: title, str });
		// rabt
		// if (day.rabt_from) {
		//     if (!details) str = `${title} ${cons.lang.rabt}: `;
		//     str += `from page ${day.rabt_from} to ${Math.max(day.from - 1, 1)}`;
		//     if (details) de.push({ title: `${title} ${cons.lang.rabt}`, str });
		// }
		return details ? de : str;
	}
}
// get verses from pages
const pageToVerse = ({ from, to, consValues }) => {
	// set all the constants
	if (consValues) setConstants(consValues);
	const amount = to - from;
	// set from
	if (from % 1)
		// get the verse after middle one
		from = versesPerPage.pages[~~from - 1].reduce((acc, curr) => {
			if (curr.isMiddle) return true;
			if (acc === true) return curr;
			return acc;
		}, false);
	else from = versesPerPage.pages[from - 1][0];
	// set to
	if (to % 1) to = versesPerPage.pages[~~to - 1].find((v) => v.isMiddle);
	else to = versesPerPage.pages[to - 1].at(-1);
	// return
	return { from: from?.verse_key, to: to?.verse_key };
};
// verse range string
const rangeToStr = ({ from, to }) => {
	// var { from, to } = pageToVerse({ from, to });
	// translate verse key to a name
	from = verseKeyToName(from);
	to = verseKeyToName(to);
	return `${cons.lang.translate("from")} ${from} ${cons.lang.translate(
		"to",
	)} ${to}`;
};
//
export const verseKeyToName = (verse_key, consValues) => {
	// set all the constants
	if (consValues) setConstants(consValues);
	const [surah, ayah] = verse_key.split(":");
	const nameLang = cons.lang.isAr ? "name_arabic" : "name_simple";
	return `${
		surahAdj.default.chapters[+surah - 1][nameLang]
	} ${cons.lang.translate("ayah")} ${ayah}`;
};

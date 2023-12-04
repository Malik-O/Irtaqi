export default function ({
	date = new Date(),
	fullDate,
	time,
	iso = true,
} = {}) {
	// console.log("-------------------------------");
	// console.log(date);
	if (+date) date = +date;
	date = new Date(date);
	if (time) return date.getTime();
	iso = iso
		? date.toISOString()
		: new Intl.DateTimeFormat("en-GB").format(date).replace(/\//g, "-");
	// console.log(iso);
	// console.log("-------------------------------");
	return fullDate ? iso : iso.slice(0, 10);
}

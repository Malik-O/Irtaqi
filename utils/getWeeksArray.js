export default function (year, month) {
	const weeks = [];
	const firstOfMonth = new Date(year, month - 1, 1);
	const lastOfMonth = new Date(year, month, 0);
	const numDaysInMonth = lastOfMonth.getDate();
	let dayOfWeek = firstOfMonth.getDay();
	let week = new Array(7).fill(0);

	for (let day = 1; day <= numDaysInMonth; day++) {
		week[dayOfWeek] = day;

		if (dayOfWeek === 6 || day === numDaysInMonth) {
			weeks.push(week);
			week = new Array(7).fill(0);
		}

		dayOfWeek = (dayOfWeek + 1) % 7;
	}

	return weeks;
}

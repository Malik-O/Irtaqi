export default function (year, month) {
	const weeks = [];
	const firstOfMonth = new Date(year, month - 1, 1);
	const lastOfMonth = new Date(year, month, 0);
	const numDaysInMonth = lastOfMonth.getDate();
	let dayOfWeek = firstOfMonth.getDay();
	let week = new Array(7).fill({ getDate: () => 0 });

	for (let day = 1; day <= numDaysInMonth; day++) {
		week[dayOfWeek] = new Date(firstOfMonth.setDate(day));

		if (dayOfWeek === 6 || day === numDaysInMonth) {
			weeks.push(week);
			week = new Array(7).fill({ getDate: () => 0 });
		}

		dayOfWeek = (dayOfWeek + 1) % 7;
	}
	// add prev month days
	let prevMonthDayPointer = 0;
	weeks[0] = weeks[0]
		.reverse()
		.reduce((acc, curr) => {
			if (!curr.getDate())
				curr = new Date(year, month - 1, prevMonthDayPointer--);
			return [...acc, curr];
		}, [])
		.reverse();
	// add next month days
	let nextMonthDayPointer = 1;
	weeks[weeks.length - 1] = weeks.at(-1).reduce((acc, curr) => {
		if (!curr.getDate())
			curr = new Date(year, month, nextMonthDayPointer++);
		return [...acc, curr];
	}, []);

	return weeks;
}

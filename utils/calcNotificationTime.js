export default function (createdAt, translate) {
	let msg;
	const now = new Date(),
		deff = (now - createdAt) / 3600000,
		// time types
		hours = ~~deff,
		miniuts = ~~((deff - hours) * 60),
		days = ~~(deff / 24),
		monthes = ~~(days / 30),
		years = ~~(days / 365),
		time = { years, monthes, days, hours, miniuts },
		// search for the bigger type
		maxIndex = Object.values(time)
			.map((x) => !!x.toString().match(/[^0]/))
			.indexOf(true);
	if (maxIndex == -1) msg = translate("now");
	else {
		let type = Object.keys(time)[maxIndex],
			grammType = time[type] > 1 ? type : type.slice(0, type.length - 1);
		msg = `${time[type]} ${grammType} ago`;
	}
	// return the output message
	return msg;
}

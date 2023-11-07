// utils
import extractISODate from "../../utils/extractISODate";

export default function (instancesHistory) {
	return instancesHistory
		.reverse()
		.filter(
			(value, index, self) =>
				self.findIndex(
					(v) =>
						extractISODate({ date: v.date }) ===
						extractISODate({ date: value.date }),
				) === index,
		);
}

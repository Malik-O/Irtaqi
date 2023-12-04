// utils
import sameHistoryCondition from "../../utils/sameHistoryCondition";

export default function (instancesHistory) {
	return instancesHistory
		.reverse()
		.filter(
			(value, index, self) =>
				self.findIndex((v) => sameHistoryCondition(v, value)) === index,
		);
}

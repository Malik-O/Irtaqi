// utils
import extractISODate from "./extractISODate";

export default function (instance1, instance2, self_instance2) {
	instance2 = {
		id: instance2?.plan_instance_id || self_instance2?.id,
		date: instance2?.date || self_instance2.date,
	};
	const isSameId = instance1.plan_instance_id === instance2?.id;
	const isSameDate =
		extractISODate({ date: instance1.date }) ===
		extractISODate({ date: instance2.date });
	console.log(
		instance1.plan_instance_id,
		instance2?.id,
		extractISODate({ date: instance1.date }),
		extractISODate({ date: instance2.date }),
		isSameId && isSameDate,
	);
	return isSameId && isSameDate;
}

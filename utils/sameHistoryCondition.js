// utils
import extractISODate from "./extractISODate";

function extractID(instance) {
	return instance?.plan_instance_id || instance?.user_id || instance?.id;
}

export default function (instance1, instance2) {
	// if same instance id
	if (instance1?.id === instance2?.id) return true;
	// prepare instances
	instance1 = { ...instance1, id: extractID(instance1) };
	instance2 = { ...instance2, id: extractID(instance2) };
	// do compare
	const isSameId = instance1.id === instance2?.id;
	const isSameDate =
		extractISODate({ date: instance1.date }) ===
		extractISODate({ date: instance2.date });
	return isSameId && isSameDate;
}

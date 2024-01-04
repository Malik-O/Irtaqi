export default function (entity) {
	return `${entity?.first_name} ${entity?.parent_name || ""} ${
		entity?.rest_of_name || ""
	}`;
}

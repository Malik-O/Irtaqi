export default function ({ id, as }, itemList) {
	// console.log(id, as);
	const selectedGroup = itemList.filter((group) => group.id === id)[0];
	let pathname;
	switch (as) {
		case "teacher":
			pathname = `/groups/[id]/asTeacher/${selectedGroup.courses[0].id}`;
			break;
		case "organization_owner":
		case "center_admin":
		case "group_admin":
			pathname = "/groups/[id]/asAdmin";
			break;
	}
	return {
		pathname,
		params: { id },
	};
}

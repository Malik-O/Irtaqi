export default function ({ groups, groupID, courseID }) {
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	const selectedCourse = selectedGroup.courses.filter((course) =>
		courseID ? course.id === courseID : true,
	)[0];
	return selectedCourse.floatingStudents;
}

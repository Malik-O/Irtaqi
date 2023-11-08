import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
// redux
import { useSelector } from "react-redux";

export default async function () {
	const { groupID, courseID, studentID } = useLocalSearchParams();
	// redux
	const { groups } = useSelector((state) => state.groups);
	return useMemo(() => {
		// close if no groups
		if (!groups.length) return;
		// filter out students
		const selectedGroup = groups.filter((group) => group.id === groupID)[0];
		const selectedCourse = selectedGroup.courses.filter(
			(course) => course.id === courseID,
		)[0];
		const selectedStudent = selectedCourse.floatingStudents.filter(
			(student) => student.id === studentID,
		)[0];
		return selectedStudent;
	}, [groups]);
}

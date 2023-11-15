import { Redirect, useLocalSearchParams, usePathname } from "expo-router";
// redux
import { useSelector } from "react-redux";

export default function () {
	const { groupID } = useLocalSearchParams();
	const pathname = usePathname();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	console.log("i:", selectedGroup.as, `${pathname}/asTeacher`);
	switch (selectedGroup.as) {
		case "teacher":
			return <Redirect href={`${pathname}/asTeacher`} />;
			break;
		case "organization_owner":
		case "center_admin":
		case "group_admin":
			return <Redirect href={`${pathname}/asAdmin`} />;
			break;
	}
}

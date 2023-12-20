import {
	useRouter,
	useLocalSearchParams,
	usePathname,
	useFocusEffect,
} from "expo-router";
// redux
import { useSelector } from "react-redux";

export default function () {
	// router stuff
	const router = useRouter();
	const { groupID } = useLocalSearchParams();
	const pathname = usePathname();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];

	// useFocusEffect(() => {
	// 	switch (selectedGroup.as) {
	// 		case "teacher":
	// 			router.replace(`${pathname}/asTeacher`);
	// 			break;
	// 		case "organization_owner":
	// 		case "center_admin":
	// 		case "group_admin":
	// 			router.replace(`${pathname}/asAdmin`);
	// 			break;
	// 	}
	// });
	return <></>;
}

import { useMemo, memo, useRef } from "react";
import {
	useLocalSearchParams,
	usePathname,
	useRouter,
	Stack,
} from "expo-router";
// redux
import { useSelector } from "react-redux";
// components
import SwipeableList from "../../../../../../components/SwipeableList";
import ScreenView from "../../../../../../components/ScreenView";
import HeaderButton from "../../../../../../components/HeaderButton";
import MenuButton from "../../../../../../components/CoolScrollView/MenuButton";
// paper
import useTranslate from "../../../../../../hook/useTranslate";
//
import fullName from "../../../../../../utils/fullName";

// resolvers
function resolveRouter(pathname) {
	return (student) => ({
		pathname: `${pathname}/[studentID]`,
		params: { studentID: student.id },
	});
}

function index() {
	// console.log("renders----------------------------------:", 0);
	const { groupID, courseID } = useLocalSearchParams();
	const router = useRouter();
	// console.log("pathname:", pathname);
	const pathname = usePathname();
	// const pathnameRef = useRef(pathname);
	// pathnameRef.current = pathname;
	const translate = useTranslate();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const groupsRef = useRef(groups);
	groupsRef.current = groups;
	const selectedGroup = useMemo(() => {
		console.log("groupsRef.current:", groupsRef.current);
		return groupsRef.current.filter((group) => group.id === groupID)[0];
	}, []);
	const floatingStudents = useMemo(() => {
		console.log("selectedGroup:", selectedGroup);
		return selectedGroup.courses.filter(
			(course) => course.id === courseID,
		)[0]?.floatingStudents;
	}, []);
	// const studentList = useMemo(
	// 	() =>
	// 		floatingStudents.map((student) => ({
	// 			...student,
	// 			title: fullName(student),
	// 			href: resolveRouter(pathname, student.id),
	// 		})),
	// 	[],
	// );
	const props = useMemo(
		() => ({
			title: selectedGroup.title,
			// tabs: selectedGroup.courses,
			back: true,
			more: {
				// icon: "",j
				items: [
					{
						title: translate("attendance", true),
						onPress: () => {
							router.replace(`groups/${groupID}/attendance`);
						},
					},
				],
			},
		}),
		[],
	);
	return (
		<ScreenView hasScrollView={false} paddingTop={false} hasLoading={true}>
			<Stack.Screen
				options={{
					headerTitle: selectedGroup.title,
					headerRight: () => <MenuButton menu={props.more} />,
					headerLeft: () => <HeaderButton isExists={true} back />,
				}}
			/>
			<SwipeableList
				data={floatingStudents}
				hasAvatar
				resolver={resolveRouter(pathname)}
			/>
		</ScreenView>
	);
}
export default memo(index);

// const groups = [
// 	{
// 		__typename: "Group",
// 		id: "650552241bac85c6cc903432",
// 		as: "organization_owner",
// 		title: "التميز",
// 		courses: [
// 			{
// 				__typename: "Course",
// 				id: "651438b01ffb2f1f855acff7",
// 				title: "قران",
// 				floatingStudents: [
// 					{
// 						__typename: "User",
// 						id: "6514396c1ffb2f1f855acff8",
// 						first_name: "محمد علاء",
// 					},
// 				],
// 				subgroups: [
// 					{
// 						__typename: "Subgroup",
// 						id: "65143cf51ffb2f1f855acffb",
// 						title: "الاعراف",
// 						student_ids: ["6514396c1ffb2f1f855acff8"],
// 						students: [
// 							{
// 								__typename: "User",
// 								id: "6514396c1ffb2f1f855acff8",
// 								first_name: "محمد علاء",
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		__typename: "Group",
// 		id: "6506f351d660b43e1e46d05b",
// 		as: "organization_owner",
// 		title: "الاشبال",
// 		courses: [],
// 	},
// 	{
// 		__typename: "Group",
// 		id: "6506f5bfd660b43e1e46d05e",
// 		as: "organization_owner",
// 		title: "الذهبي",
// 		courses: [],
// 	},
// ];

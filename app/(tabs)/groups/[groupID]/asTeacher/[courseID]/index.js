import "../../../../../../wdyr";
import { useMemo, memo, useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import {
	useLocalSearchParams,
	usePathname,
	useRouter,
	Stack,
} from "expo-router";
import Animated from "react-native-reanimated";
// redux
import { useSelector, useDispatch } from "react-redux";
// components
import Card from "../../../../../../components/Card";
import ScreenView from "../../../../../../components/ScreenView";
import ScreenText from "../../../../../../components/ScreenText";
import CoolScrollView from "../../../../../../components/CoolScrollView";
import HeaderButton from "../../../../../../components/HeaderButton";
import MenuButton from "../../../../../../components/CoolScrollView/MenuButton";
// hook
import useTheme from "../../../../../../hook/useTheme";
// paper
import useTranslate from "../../../../../../hook/useTranslate";
// resolvers
function fullName(entity) {
	return `${entity.first_name} ${entity.parent_name || ""}`;
}
function resolveRouter(pathname, studentID) {
	return { pathname: `${pathname}/[studentID]`, params: { studentID } };
}
function useCurrPth() {
	const pathnameRef = useRef(null);
	const pathname = usePathname();
	pathnameRef.current = pathname;
	return "/groups/650552241bac85c6cc903432/asTeacher/651438b01ffb2f1f855acff7";
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
	const studentList = useMemo(
		() =>
			floatingStudents.map((student) => ({
				...student,
				title: fullName(student),
				href: resolveRouter(pathname, student.id),
			})),
		[],
	);
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
			<Animated.FlatList
				style={[{ marginBottom: 80 }]}
				data={studentList}
				scrollEventThrottle={16}
				keyExtractor={(_, i) => i}
				renderItem={({ item, index }) => {
					return <Card key={index} item={item} href={item.href} />;
				}}
			/>
		</ScreenView>
	);
}
index.whyDidYouRender = {
	logOnDifferentValues: true,
};
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

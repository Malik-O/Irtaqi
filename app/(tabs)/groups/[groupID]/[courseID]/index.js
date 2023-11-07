import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
// components
import Card from "../../../../../components/Card";
import ScreenView from "../../../../../components/ScreenView";
import ScreenText from "../../../../../components/ScreenText";
import CoolTabsView from "../../../../../components/CoolTabsView";
// paper
import {
	Button as PaperButton,
	Dialog,
	Portal,
	PaperProvider,
	Text as PaperText,
} from "react-native-paper";
import { useEffect } from "react";

// resolvers
function fullName(entity) {
	return `${entity.first_name} ${entity.parent_name || ""}`;
}
function resolveRouter(pathname, studentID) {
	return { pathname: `${pathname}/[studentID]`, params: { studentID } };
}
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
export default function () {
	const { groupID, courseID } = useLocalSearchParams();
	// const router = useRouter();
	const pathname = usePathname();
	// redux
	const { groups } = useSelector((state) => state.groups);
	const selectedGroup = groups.filter((group) => group.id === groupID)[0];
	const selectedCourse = selectedGroup.courses.filter(
		(course) => course.id === courseID,
	)[0];
	const tabsProps = {
		title: selectedGroup.title,
		tabs: selectedGroup.courses,
		back: true,
		more: true,
	};
	return (
		<ScreenView>
			{/* <CoolTabsView props={tabsProps}> */}
			{selectedCourse.floatingStudents.map((student, i) => (
				<Card
					key={i}
					item={{ ...student, title: fullName(student) }}
					href={resolveRouter(pathname, student.id)}
				/>
			))}
			{/* </CoolTabsView> */}
		</ScreenView>
	);
}

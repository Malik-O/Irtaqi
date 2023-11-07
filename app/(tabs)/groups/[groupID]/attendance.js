import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
//* components
import ScreenView from "../../../../components/ScreenView";
import ScreenText from "../../../../components/ScreenText";
import GlobalDatePicker from "../../../../components/GlobalDatePicker";
import UserCard from "../../../../components/UserCard";
//* hook
import useGroupAttendance from "../../../../hook/useGroupAttendance";
//* hook
import fStudentsFromGroup from "../../../../utils/fStudentsFromGroup";

export default function attendance() {
	const { groupID } = useLocalSearchParams();
	const attendanceLoading = useGroupAttendance();
	// redux
	const { groups, attendanceHistory } = useSelector((state) => state.groups);
	const students = fStudentsFromGroup({ groups, groupID });
	return (
		<ScreenView>
			<GlobalDatePicker />
			<ScreenText>attendance: {attendanceLoading + ""}</ScreenText>
			<ScreenText>{JSON.stringify(attendanceHistory)}</ScreenText>
			{students.map((student, i) => (
				<UserCard key={i} student={student} />
			))}
		</ScreenView>
	);
}
